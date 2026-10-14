import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { withForm } from '@/components/organisms/form/use-form';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import { ORGANIZATION_INVITE_ROLES } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import { createMemberFormOptions } from './create-member-form-options';

export const CreateMemberForm = withForm({
  ...createMemberFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    const { _ } = useLingui();

    return (
      <div className='grid gap-4'>
        <NameEmailFieldsGroup
          fields={{
            email: 'email',
            name: 'name',
          }}
          form={form}
        />

        <form.AppField name='password'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='new-password'
              isRequired
              label={_(msg`Temporary password`)}
              variant='secondary'
            />
          )}
        </form.AppField>

        <form.AppField name='role'>
          {(field) => (
            <field.FormSelect
              isRequired
              label={_(msg`Role`)}
              options={ORGANIZATION_INVITE_ROLES.map((role) => ({
                label: getOrganizationRoleLabel(role),
                value: role,
              }))}
              variant='secondary'
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
