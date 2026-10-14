import { withForm } from '@/components/organisms/form/use-form';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import { updateProfileFormOptions } from './update-profile-form-options';

export const UpdateProfileForm = withForm({
  ...updateProfileFormOptions({
    onSubmit: () => undefined,
  }),
  render: function Render({ form }) {
    return (
      <div className='grid gap-4'>
        <NameEmailFieldsGroup
          fields={{
            email: 'email',
            name: 'name',
          }}
          form={form}
        />
      </div>
    );
  },
});
