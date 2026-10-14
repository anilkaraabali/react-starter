import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { withForm } from '@/components/organisms/form/use-form';
import { resetPasswordFormOptions } from './reset-password-form-options';

export const ResetPasswordForm = withForm({
  ...resetPasswordFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <PasswordFieldsGroup
        confirmLabel={_(msg`Confirm New Password`)}
        fields={{ confirmPassword: 'confirmPassword', password: 'password' }}
        form={form}
        passwordLabel={_(msg`New Password`)}
      />
    );
  },
});
