import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type UpdateProfileInput,
  UpdateProfileSchema,
} from '@/features/account/types/update-profile-input';

const updateProfileDefaultValues: UpdateProfileInput = {
  email: '',
  name: '',
};

type UpdateProfileFormOptionsProps = {
  defaultValues?: Partial<UpdateProfileInput>;
  onSubmit: (data: UpdateProfileInput) => Promise<void> | void;
};

export function updateProfileFormOptions({
  defaultValues,
  onSubmit,
}: UpdateProfileFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...updateProfileDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(UpdateProfileSchema.parse(value)),
    validators: createFormValidators(UpdateProfileSchema),
  });
}
