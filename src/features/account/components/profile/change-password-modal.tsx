import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useChangePassword } from '@/features/account/api/change-password';
import {
  type ChangePasswordInput,
  changePasswordDefaultValues,
  changePasswordInputSchema,
} from '@/features/account/types/change-password-input';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { t } = useLingui();
  const changePasswordMutation = useChangePassword({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Password updated.`);
        onClose();
      },
    },
  });

  const form = useForm({
    defaultValues: changePasswordDefaultValues,
    onSubmit: async (data: ChangePasswordInput) => {
      await changePasswordMutation.mutateAsync({
        data: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          revokeOtherSessions: data.revokeOtherSessions,
        },
      });
    },
    schema: changePasswordInputSchema,
  });

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={t`Save`}
      title={t`Change Password`}
    >
      <div className='grid gap-4'>
        <form.AppField name='currentPassword'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='current-password'
              isRequired
              label={t`Old Password`}
              variant='secondary'
            />
          )}
        </form.AppField>

        <PasswordFieldsGroup
          confirmLabel={t`New Password Again`}
          fields={{
            confirmPassword: 'confirmPassword',
            password: 'newPassword',
          }}
          form={form}
          passwordLabel={t`New Password`}
        />

        <form.AppField name='revokeOtherSessions'>
          {(field) => (
            <field.FormSwitch label={t`Sign out of all other devices`} />
          )}
        </form.AppField>
      </div>
    </FormModalShell>
  );
}
