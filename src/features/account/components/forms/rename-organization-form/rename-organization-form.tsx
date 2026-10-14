import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { withForm } from '@/components/organisms/form/use-form';
import { renameOrganizationFormOptions } from './rename-organization-form-options';

export const RenameOrganizationForm = withForm({
  ...renameOrganizationFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <form.AppField name='name'>
        {(field) => (
          <field.FormInput
            autoComplete='organization'
            isRequired
            label={_(msg`Organization name`)}
            variant='secondary'
          />
        )}
      </form.AppField>
    );
  },
});
