import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useRenameOrganization } from '@/features/account/api/rename-organization';
import { RenameOrganizationForm } from '@/features/account/components/forms/rename-organization-form/rename-organization-form';
import { renameOrganizationFormOptions } from '@/features/account/components/forms/rename-organization-form/rename-organization-form-options';
import type { RenameOrganizationInput } from '@/features/account/types/rename-organization-input';

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

  const form = useForm(
    renameOrganizationFormOptions({
      defaultValues: { name: defaultName },
      onSubmit: async (data: RenameOrganizationInput) => {
        if (data.name === defaultName) {
          onClose();
          return;
        }

        await renameOrganizationMutation.mutateAsync({
          data: { name: data.name },
        });
      },
    })
  );

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={_(msg`Save`)}
      title={_(msg`Rename Organization`)}
    >
      {(shellForm) => <RenameOrganizationForm form={shellForm} />}
    </FormModalShell>
  );
}
