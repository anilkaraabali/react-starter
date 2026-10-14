import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { PasswordFieldsGroup } from '@/components/organisms/form/fields/password-fields-group';
import { withForm } from '@/components/organisms/form/use-form';
import { changePasswordFormOptions } from './change-password-form-options';

export const ChangePasswordForm = withForm({
  ...changePasswordFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <div className='grid gap-4'>
        <form.AppField name='currentPassword'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='current-password'
              isRequired
              label={_(msg`Old Password`)}
              variant='secondary'
            />
          )}
        </form.AppField>

        <PasswordFieldsGroup
          confirmLabel={_(msg`New Password Again`)}
          fields={{
            confirmPassword: 'confirmPassword',
            password: 'newPassword',
          }}
          form={form}
          passwordLabel={_(msg`New Password`)}
        />

        <form.AppField name='revokeOtherSessions'>
          {(field) => (
            <field.FormSwitch label={_(msg`Sign out of all other devices`)} />
          )}
        </form.AppField>
      </div>
    );
  },
});
