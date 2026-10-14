import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useCreateMember } from '@/features/account/api/create-member';
import { CreateMemberForm } from '@/features/account/components/forms/create-member-form/create-member-form';
import { createMemberFormOptions } from '@/features/account/components/forms/create-member-form/create-member-form-options';
import type { CreateMemberInput } from '@/features/account/types/create-member-input';

type CreateMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateMemberModal({ isOpen, onClose }: CreateMemberModalProps) {
  const { _ } = useLingui();
  const createMemberMutation = useCreateMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Member added.`));
        onClose();
      },
    },
  });

  const form = useForm(
    createMemberFormOptions({
      onSubmit: async (data: CreateMemberInput) => {
        await createMemberMutation.mutateAsync({ data });
      },
    })
  );

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={_(msg`Create`)}
      title={_(msg`Add member`)}
    >
      {(shellForm) => <CreateMemberForm form={shellForm} />}
    </FormModalShell>
  );
}
