import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { useForm } from '@/components/organisms/form/use-form';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { LoginForm } from '@/features/auth/components/forms/login-form/login-form';
import { loginFormOptions } from '@/features/auth/components/forms/login-form/login-form-options';
import { useAccountDeletedToast } from '@/features/auth/hooks/use-account-deleted-toast';
import type { LoginInput } from '@/features/auth/types/login-input';
import { signIn } from '@/lib/auth-client';

export function LoginView() {
  const { _ } = useLingui();
  useAccountDeletedToast();

  const form = useForm(
    loginFormOptions({
      onSubmit: async (data: LoginInput) => {
        await signIn.email(
          {
            ...data,
            callbackURL: APP_ROUTES.DASHBOARD,
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
        msg`Access your account quickly and securely to get started.`
      )}
      footer={
        <Trans>
          New here? Use your email to{' '}
          <Link href={APP_ROUTES.REGISTER}>sign up.</Link>
        </Trans>
      }
      title={_(msg`Sign in`)}
    >
      <form.AppForm>
        <form.Root>
          <LoginForm form={form} />

          {/* -mt-3 keeps the same tight gap the link had inside the field. */}
          <div className='-mt-3 flex justify-end'>
            <Link className='text-xs' href={APP_ROUTES.FORGOT_PASSWORD}>
              {_(msg`Forgot password?`)}
            </Link>
          </div>

          <form.SubmitButton fullWidth>{_(msg`Sign in`)}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
