import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { withFieldGroup } from '@/components/organisms/form/use-form';

/**
 * Full name + email pair, shared by the member and profile forms.
 *
 * `defaultValues` declares the keys the group owns; the form supplies the
 * values. Both fields take their wording here, which is why the group needs no
 * props: every form says "Email address" while the short "Email" stays for
 * row and field labels in the views.
 */
export const NameEmailFieldsGroup = withFieldGroup({
  defaultValues: {
    email: '',
    name: '',
  },
  render: function Render({ group }) {
    return (
      <>
        <group.AppField name='name'>
          {(field) => (
            <field.FormInput
              autoComplete='name'
              isRequired
              label={i18n._(msg`Full name`)}
              variant='secondary'
            />
          )}
        </group.AppField>

        <group.AppField name='email'>
          {(field) => (
            <field.FormInput
              autoComplete='email'
              isRequired
              label={i18n._(msg`Email address`)}
              placeholder='foo@example.com'
              type='email'
              variant='secondary'
            />
          )}
        </group.AppField>
      </>
    );
  },
});
