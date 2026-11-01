import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { useForm } from '@/components/organisms/form/use-form';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { ResetPasswordInvalidLink } from '@/features/auth/components/reset-password-invalid-link';
import {
  type ResetPasswordFormValues,
  resetPasswordFormDefaultValues,
  resetPasswordFormSchema,
} from '@/features/auth/schemas/reset-password-form-schema';
import { authClient } from '@/lib/auth-client';

export function ResetPasswordView() {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { error, token } = useSearch({ from: '/_auth/reset-password' });

  const form = useForm({
    defaultValues: resetPasswordFormDefaultValues,
    onSubmit: async (data: ResetPasswordFormValues) => {
      if (!token) {
        return;
      }

      await authClient.resetPassword(
        {
          newPassword: data.password,
          token,
        },
        {
          onError(context) {
            toast.danger(context.error.message);
          },
          onSuccess() {
            toast.success(t`Password has been reset successfully`);
            navigate({ to: '/login' });
          },
        }
      );
    },
    schema: resetPasswordFormSchema,
  });

  if (error || !token) {
    return <ResetPasswordInvalidLink />;
  }

  return (
    <AuthFormShell
      description={t`Please enter your new password below.`}
      title={t`Reset password`}
    >
      <form.AppForm>
        <form.Root>
          <PasswordFieldsGroup
            confirmLabel={t`Confirm New Password`}
            fields={{
              confirmPassword: 'confirmPassword',
              password: 'password',
            }}
            form={form}
            passwordLabel={t`New Password`}
          />

          <form.SubmitButton fullWidth>{t`Reset password`}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
