import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';

import { useForm } from '@/components/organisms/form/use-form';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { ForgotPasswordForm } from '@/features/auth/components/forms/forgot-password-form/forgot-password-form';
import { forgotPasswordFormOptions } from '@/features/auth/components/forms/forgot-password-form/forgot-password-form-options';
import type { ForgotPasswordInput } from '@/features/auth/types/forgot-password-input';
import { authClient } from '@/lib/auth-client';

export function ForgotPasswordView() {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const form = useForm(
    forgotPasswordFormOptions({
      onSubmit: async (data: ForgotPasswordInput) => {
        await authClient.requestPasswordReset(
          {
            email: data.email,
            redirectTo: APP_ROUTES.RESET_PASSWORD,
          },
          {
            onError(context) {
              toast.danger(context.error.message);
            },
            onSuccess() {
              toast.success(_(msg`Password reset link sent to your email`));
              navigate({ to: APP_ROUTES.LOGIN });
            },
          }
        );
      },
    })
  );

  return (
    <AuthFormShell
      description={_(
        msg`Enter your email address and we will send you a link to reset your password.`
      )}
      footer={
        <Trans>
          Remember your password? <Link href={APP_ROUTES.LOGIN}>Sign in.</Link>
        </Trans>
      }
      title={_(msg`Forgot password`)}
    >
      <form.AppForm>
        <form.Root>
          <ForgotPasswordForm form={form} />

          <form.SubmitButton fullWidth>
            {_(msg`Send reset link`)}
          </form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
