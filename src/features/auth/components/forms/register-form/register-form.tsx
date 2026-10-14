import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { withForm } from '@/components/organisms/form/use-form';
import { registerFormOptions } from './register-form-options';

export const RegisterForm = withForm({
  ...registerFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <>
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
          fields={{ confirmPassword: 'confirmPassword', password: 'password' }}
          form={form}
          passwordLabel={_(msg`Password`)}
        />
      </>
    );
  },
});
