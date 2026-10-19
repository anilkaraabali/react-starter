import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { useForm } from '@/components/organisms/form/use-form';
import { APP_ROUTE_IDS, APP_ROUTES } from '@/config/app-routes.constants';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { ResetPasswordInvalidLink } from '@/features/auth/components/reset-password-invalid-link';
import {
  type ResetPasswordInput,
  resetPasswordDefaultValues,
  resetPasswordInputSchema,
} from '@/features/auth/types/reset-password-input';
import { authClient } from '@/lib/auth-client';

export function ResetPasswordView() {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const { error, token } = useSearch({ from: APP_ROUTE_IDS.RESET_PASSWORD });

  const form = useForm({
    defaultValues: resetPasswordDefaultValues,
    onSubmit: async (data: ResetPasswordInput) => {
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
            toast.success(_(msg`Password has been reset successfully`));
            navigate({ to: APP_ROUTES.LOGIN });
          },
        }
      );
    },
    schema: resetPasswordInputSchema,
  });

  if (error || !token) {
    return <ResetPasswordInvalidLink />;
  }

  return (
    <AuthFormShell
      description={_(msg`Please enter your new password below.`)}
      title={_(msg`Reset password`)}
    >
      <form.AppForm>
        <form.Root>
          <PasswordFieldsGroup
            confirmLabel={_(msg`Confirm New Password`)}
            fields={{
              confirmPassword: 'confirmPassword',
              password: 'password',
            }}
            form={form}
            passwordLabel={_(msg`New Password`)}
          />

          <form.SubmitButton fullWidth>
            {_(msg`Reset password`)}
          </form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
