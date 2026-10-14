import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { withForm } from '@/components/organisms/form/use-form';
import { deleteAccountFormOptions } from './delete-account-form-options';

export const DeleteAccountForm = withForm({
  ...deleteAccountFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
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
    );
  },
});
