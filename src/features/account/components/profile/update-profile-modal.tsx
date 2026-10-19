import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useUpdateProfile } from '@/features/account/api/update-profile';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import {
  type UpdateProfileInput,
  updateProfileDefaultValues,
  updateProfileInputSchema,
} from '@/features/account/types/update-profile-input';

type UpdateProfileModalProps = {
  defaultValues: UpdateProfileInput;
  isOpen: boolean;
  onClose: () => void;
};

export function UpdateProfileModal({
  defaultValues,
  isOpen,
  onClose,
}: UpdateProfileModalProps) {
  const { _ } = useLingui();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Profile updated.`));
        onClose();
      },
    },
  });
  const { email: defaultEmail, name: defaultName } = defaultValues;

  const form = useForm({
    defaultValues: { ...updateProfileDefaultValues, ...defaultValues },
    onSubmit: async (data: UpdateProfileInput) => {
      const payload: {
        email?: string;
        name?: string;
      } = {};

      if (data.name !== defaultName) {
        payload.name = data.name;
      }
      if (data.email !== defaultEmail) {
        payload.email = data.email;
      }

      if (!payload.name && !payload.email) {
        onClose();
        return;
      }

      await updateProfileMutation.mutateAsync({ data: payload });
    },
    schema: updateProfileInputSchema,
  });

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={_(msg`Save`)}
      title={_(msg`Edit Profile`)}
    >
      <div className='grid gap-4'>
        <NameEmailFieldsGroup
          fields={{
            email: 'email',
            name: 'name',
          }}
          form={form}
        />
      </div>
    </FormModalShell>
  );
}
