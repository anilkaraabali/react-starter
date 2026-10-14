import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useChangePassword } from '@/features/account/api/change-password';
import { ChangePasswordForm } from '@/features/account/components/forms/change-password-form/change-password-form';
import { changePasswordFormOptions } from '@/features/account/components/forms/change-password-form/change-password-form-options';
import type { ChangePasswordInput } from '@/features/account/types/change-password-input';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { _ } = useLingui();
  const changePasswordMutation = useChangePassword({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Password updated.`));
        onClose();
      },
    },
  });

  const form = useForm(
    changePasswordFormOptions({
      onSubmit: async (data: ChangePasswordInput) => {
        await changePasswordMutation.mutateAsync({
          data: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            revokeOtherSessions: data.revokeOtherSessions,
          },
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
      title={_(msg`Change Password`)}
    >
      {(shellForm) => <ChangePasswordForm form={shellForm} />}
    </FormModalShell>
  );
}
