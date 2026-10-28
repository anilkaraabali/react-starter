import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';

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
  const { t } = useLingui();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Profile updated.`);
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
      submitLabel={t`Save`}
      title={t`Edit Profile`}
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
