import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useRenameOrganization } from '@/features/account/api/rename-organization';
import {
  type RenameOrganizationInput,
  renameOrganizationDefaultValues,
  renameOrganizationInputSchema,
} from '@/features/account/types/rename-organization-input';

type RenameOrganizationModalProps = {
  defaultName: string;
  isOpen: boolean;
  onClose: () => void;
};

export function RenameOrganizationModal({
  defaultName,
  isOpen,
  onClose,
}: RenameOrganizationModalProps) {
  const { _ } = useLingui();
  const renameOrganizationMutation = useRenameOrganization({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Organization renamed.`));
        onClose();
      },
    },
  });

  const form = useForm({
    defaultValues: { ...renameOrganizationDefaultValues, name: defaultName },
    onSubmit: async (data: RenameOrganizationInput) => {
      if (data.name === defaultName) {
        onClose();
        return;
      }

      await renameOrganizationMutation.mutateAsync({
        data: { name: data.name },
      });
    },
    schema: renameOrganizationInputSchema,
  });

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={_(msg`Save`)}
      title={_(msg`Rename Organization`)}
    >
      <form.AppField name='name'>
        {(field) => (
          <field.FormInput
            autoComplete='organization'
            isRequired
            label={_(msg`Organization name`)}
            variant='secondary'
          />
        )}
      </form.AppField>
    </FormModalShell>
  );
}
