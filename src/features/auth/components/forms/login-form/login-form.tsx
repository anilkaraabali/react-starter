import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { withForm } from '@/components/organisms/form/use-form';
import { loginFormOptions } from './login-form-options';

export const LoginForm = withForm({
  ...loginFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <>
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

        <form.AppField name='password'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='current-password'
              isRequired
              label={_(msg`Password`)}
              variant='secondary'
            />
          )}
        </form.AppField>
      </>
    );
  },
});
