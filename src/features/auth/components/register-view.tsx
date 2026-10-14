import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { useForm } from '@/components/organisms/form/use-form';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { RegisterForm } from '@/features/auth/components/forms/register-form/register-form';
import { registerFormOptions } from '@/features/auth/components/forms/register-form/register-form-options';
import type { RegisterInput } from '@/features/auth/types/register-input';
import { signUp } from '@/lib/auth-client';

export function RegisterView() {
  const { _ } = useLingui();

  const form = useForm(
    registerFormOptions({
      onSubmit: async (data: RegisterInput) => {
        await signUp.email(
          {
            callbackURL: APP_ROUTES.DASHBOARD,
            email: data.email,
            name: data.name,
            password: data.password,
          },
          {
            onError(context) {
              toast.danger(context.error.message);
            },
            onSuccess() {
              window.location.href = APP_ROUTES.DASHBOARD;
            },
          }
        );
      },
    })
  );

  return (
    <AuthFormShell
      description={_(
        msg`Create your account in just a few steps and start today.`
      )}
      footer={
        <Trans>
          If you already have an account, please{' '}
          <Link href={APP_ROUTES.LOGIN}>sign in.</Link>
        </Trans>
      }
      title={_(msg`Sign up`)}
    >
      <form.AppForm>
        <form.Root>
          <RegisterForm form={form} />

          <form.SubmitButton fullWidth>{_(msg`Sign up`)}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
