import { withFieldGroup } from '@/components/organisms/form/use-form';

/**
 * Password + confirm-password pair. The keys declare what the group owns; the
 * form supplies the values. No validator here on purpose: a group cannot carry
 * one, so the match rule stays in each form's schema `superRefine`.
 */
export const PasswordFieldsGroup = withFieldGroup({
  defaultValues: {
    confirmPassword: '',
    password: '',
  },
  props: {
    confirmLabel: '',
    passwordLabel: '',
  },
  render: function Render({ confirmLabel, group, passwordLabel }) {
    return (
      <>
        <group.AppField name='password'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='new-password'
              isRequired
              label={passwordLabel}
              variant='secondary'
            />
          )}
        </group.AppField>

        <group.AppField name='confirmPassword'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='new-password'
              isRequired
              label={confirmLabel}
              variant='secondary'
            />
          )}
        </group.AppField>
      </>
    );
  },
});
