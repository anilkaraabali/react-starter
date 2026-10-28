import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';

import { useForm } from '@/components/organisms/form/use-form';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import { useAccountDeletedToast } from '@/features/auth/hooks/use-account-deleted-toast';
import {
  type LoginInput,
  loginDefaultValues,
  loginInputSchema,
} from '@/features/auth/types/login-input';
import { signIn } from '@/lib/auth-client';

export function LoginView() {
  const { t } = useLingui();
  useAccountDeletedToast();

  const form = useForm({
    defaultValues: loginDefaultValues,
    onSubmit: async (data: LoginInput) => {
      await signIn.email(
        {
          ...data,
          callbackURL: '/dashboard',
        },
        {
          onError(context) {
            toast.danger(context.error.message);
          },
          onSuccess() {
            window.location.href = '/dashboard';
          },
        }
      );
    },
    schema: loginInputSchema,
  });

  return (
    <AuthFormShell
      description={t(
        msg`Access your account quickly and securely to get started.`
      )}
      footer={
        <Trans>
          New here? Use your email to <Link href='/register'>sign up.</Link>
        </Trans>
      }
      title={t`Sign in`}
    >
      <form.AppForm>
        <form.Root>
          <form.AppField name='email'>
            {(field) => (
              <field.FormInput
                autoComplete='email'
                isRequired
                label={t`Email address`}
                placeholder='foo@example.com'
                variant='secondary'
              />
            )}
          </form.AppField>

          <form.AppField name='password'>
            {(field) => (
              <field.FormPasswordInput
                autoComplete='current-password'
                isRequired
                label={t`Password`}
                variant='secondary'
              />
            )}
          </form.AppField>

          {/* -mt-3 keeps the same tight gap the link had inside the field. */}
          <div className='-mt-3 flex justify-end'>
            <Link className='text-xs' href='/forgot-password'>
              {t`Forgot password?`}
            </Link>
          </div>

          <form.SubmitButton fullWidth>{t`Sign in`}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
