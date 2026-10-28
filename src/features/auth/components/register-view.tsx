import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { useForm } from '@/components/organisms/form/use-form';
import { AuthFormShell } from '@/features/auth/components/auth-form-shell';
import {
  type RegisterInput,
  registerDefaultValues,
  registerInputSchema,
} from '@/features/auth/types/register-input';
import { signUp } from '@/lib/auth-client';

export function RegisterView() {
  const { t } = useLingui();

  const form = useForm({
    defaultValues: registerDefaultValues,
    onSubmit: async (data: RegisterInput) => {
      await signUp.email(
        {
          callbackURL: '/dashboard',
          email: data.email,
          name: data.name,
          password: data.password,
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
    schema: registerInputSchema,
  });

  return (
    <AuthFormShell
      description={t(
        msg`Create your account in just a few steps and start today.`
      )}
      footer={
        <Trans>
          If you already have an account, please{' '}
          <Link href='/login'>sign in.</Link>
        </Trans>
      }
      title={t`Sign up`}
    >
      <form.AppForm>
        <form.Root>
          <form.AppField name='name'>
            {(field) => (
              <field.FormInput
                autoComplete='name'
                isRequired
                label={t`Full name`}
                placeholder='John Doe'
                variant='secondary'
              />
            )}
          </form.AppField>

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

          <PasswordFieldsGroup
            confirmLabel={t`Confirm password`}
            fields={{
              confirmPassword: 'confirmPassword',
              password: 'password',
            }}
            form={form}
            passwordLabel={t`Password`}
          />

          <form.SubmitButton fullWidth>{t`Sign up`}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
