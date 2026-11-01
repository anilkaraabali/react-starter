import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useUpdateProfile } from '@/api/endpoints/account/update-profile';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import {
  mapUpdateProfileFormToInput,
  type UpdateProfileFormValues,
  updateProfileFormDefaultValues,
  updateProfileFormSchema,
} from '@/features/account/schemas/update-profile-form-schema';

type UpdateProfileModalProps = {
  defaultValues: UpdateProfileFormValues;
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
    defaultValues: { ...updateProfileFormDefaultValues, ...defaultValues },
    onSubmit: async (data: UpdateProfileFormValues) => {
      const payload = mapUpdateProfileFormToInput(data, {
        email: defaultEmail,
        name: defaultName,
      });

      if (!payload.name && !payload.email) {
        onClose();
        return;
      }

      await updateProfileMutation.mutateAsync({ data: payload });
    },
    schema: updateProfileFormSchema,
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
