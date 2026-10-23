import { Link, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

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
  const { _ } = useLingui();

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
      description={_(
        msg`Create your account in just a few steps and start today.`
      )}
      footer={
        <Trans>
          If you already have an account, please{' '}
          <Link href='/login'>sign in.</Link>
        </Trans>
      }
      title={_(msg`Sign up`)}
    >
      <form.AppForm>
        <form.Root>
          <form.AppField name='name'>
            {(field) => (
              <field.FormInput
                autoComplete='name'
                isRequired
                label={_(msg`Full name`)}
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
                label={_(msg`Email address`)}
                placeholder='foo@example.com'
                variant='secondary'
              />
            )}
          </form.AppField>

          <PasswordFieldsGroup
            confirmLabel={_(msg`Confirm password`)}
            fields={{
              confirmPassword: 'confirmPassword',
              password: 'password',
            }}
            form={form}
            passwordLabel={_(msg`Password`)}
          />

          <form.SubmitButton fullWidth>{_(msg`Sign up`)}</form.SubmitButton>
        </form.Root>
      </form.AppForm>
    </AuthFormShell>
  );
}
