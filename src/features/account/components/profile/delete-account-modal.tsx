import { AlertDialog, Button, Spinner } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useSelector } from '@tanstack/react-form';
import { useEffect, useId } from 'react';
import { useForm } from '@/components/organisms/form/use-form';
import { useDeleteAccount } from '@/features/account/api/delete-account';
import {
  type DeleteAccountInput,
  deleteAccountDefaultValues,
  deleteAccountInputSchema,
} from '@/features/account/types/delete-account-input';
import { useSession } from '@/lib/auth-client';

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const { _ } = useLingui();
  const formId = useId();
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';
  const deleteAccountMutation = useDeleteAccount();

  const form = useForm({
    defaultValues: deleteAccountDefaultValues,
    onSubmit: async (data: DeleteAccountInput) => {
      await deleteAccountMutation.mutateAsync({
        data: { password: data.password },
      });
    },
    schema: deleteAccountInputSchema,
  });

  const isPending = useSelector(form.store, (s) => s.isSubmitting);

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [form, isOpen]);

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Backdrop
        isDismissable={!isPending}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger isDisabled={isPending} />
            <AlertDialog.Header>
              <AlertDialog.Icon status='danger' />
              <AlertDialog.Heading>
                {_(msg`Delete Account`)}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className='grid gap-4'>
              {isAdmin ? (
                <Trans>
                  This permanently deletes your account, organizations you own,
                  and all organization data. Members and guests lose access.
                  This cannot be undone.
                </Trans>
              ) : (
                <Trans>
                  This permanently deletes your account and removes you from any
                  organizations. Shared organization data is not deleted. This
                  cannot be undone.
                </Trans>
              )}
              <form.AppForm>
                <form.Root id={formId}>
                  <form.AppField name='password'>
                    {(field) => (
                      <field.FormPasswordInput
                        autoComplete='current-password'
                        isRequired
                        label={_(msg`Password`)}
                        variant='secondary'
                      />
                    )}
                  </form.AppField>
                </form.Root>
              </form.AppForm>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                isDisabled={isPending}
                onPress={handleClose}
                slot='close'
                variant='tertiary'
              >
                {_(msg`Cancel`)}
              </Button>
              <Button
                form={formId}
                isPending={isPending}
                type='submit'
                variant='danger'
              >
                {({ isPending: pending }) => (
                  <>
                    {pending ? <Spinner color='current' size='sm' /> : null}
                    {_(msg`Delete Account`)}
                  </>
                )}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
