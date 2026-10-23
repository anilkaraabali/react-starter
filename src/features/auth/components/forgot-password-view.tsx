import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';

import { useForm } from '@/components/organisms/form/use-form';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import {
  type ForgotPasswordInput,
  forgotPasswordDefaultValues,
  forgotPasswordInputSchema,
} from '@/features/auth/types/forgot-password-input';
import { authClient } from '@/lib/auth-client';

export function ForgotPasswordView() {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: forgotPasswordDefaultValues,
    onSubmit: async (data: ForgotPasswordInput) => {
      await authClient.requestPasswordReset(
        {
          email: data.email,
          redirectTo: '/reset-password',
        },
        {
          onError(context) {
            toast.danger(context.error.message);
          },
          onSuccess() {
            toast.success(_(msg`Password reset link sent to your email`));
            navigate({ to: '/login' });
          },
        }
      );
    },
    schema: forgotPasswordInputSchema,
  });

  return (
    <AuthFormShell
      description={_(
        msg`Enter your email address and we will send you a link to reset your password.`
      )}
      footer={
        <Trans>
          Remember your password? <Link href='/login'>Sign in.</Link>
        </Trans>
      }
      title={_(msg`Forgot password`)}
    >
      <form.AppForm>
        <form.Root>
          <form.AppField name='email'>
            {(field) => (
              <field.FormInput
                autoComplete='email'
                isRequired
                label={_(msg`Email address`)}
                placeholder='foo@example.com'
                variant='secondary'
              />
            )}
          </form.AppField>

          <form.SubmitButton fullWidth>
            {_(msg`Send reset link`)}
          </form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
