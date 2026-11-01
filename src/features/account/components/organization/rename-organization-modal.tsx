import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useRenameOrganization } from '@/api/endpoints/organizations/rename-organization';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import {
  type RenameOrganizationFormValues,
  renameOrganizationFormDefaultValues,
  renameOrganizationFormSchema,
} from '@/features/account/schemas/rename-organization-form-schema';

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
    defaultValues: {
      ...renameOrganizationFormDefaultValues,
      name: defaultName,
    },
    onSubmit: async (data: RenameOrganizationFormValues) => {
      if (data.name === defaultName) {
        onClose();
        return;
      }

      await renameOrganizationMutation.mutateAsync({
        data: { name: data.name },
      });
    },
    schema: renameOrganizationFormSchema,
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
