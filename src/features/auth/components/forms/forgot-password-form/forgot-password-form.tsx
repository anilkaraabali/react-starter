import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { withForm } from '@/components/organisms/form/use-form';
import { forgotPasswordFormOptions } from './forgot-password-form-options';

export const ForgotPasswordForm = withForm({
  ...forgotPasswordFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
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
    );
  },
});
