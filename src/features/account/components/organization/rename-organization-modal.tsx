import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();
  const renameOrganizationMutation = useRenameOrganization({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Organization renamed.`);
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
      submitLabel={t`Save`}
      title={t`Rename Organization`}
    >
      <form.AppField name='name'>
        {(field) => (
          <field.FormInput
            autoComplete='organization'
            isRequired
            label={t`Organization name`}
            variant='secondary'
          />
        )}
      </form.AppField>
    </FormModalShell>
  );
}
