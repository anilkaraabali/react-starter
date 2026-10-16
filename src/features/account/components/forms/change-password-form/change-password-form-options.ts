import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type ChangePasswordInput,
  ChangePasswordSchema,
} from '@/features/account/types/change-password-input';

const changePasswordDefaultValues: ChangePasswordInput = {
  confirmPassword: '',
  currentPassword: '',
  newPassword: '',
  revokeOtherSessions: false,
};

type ChangePasswordFormOptionsProps = {
  defaultValues?: Partial<ChangePasswordInput>;
  onSubmit: (data: ChangePasswordInput) => Promise<void> | void;
};

export function changePasswordFormOptions({
  defaultValues,
  onSubmit,
}: ChangePasswordFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...changePasswordDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(ChangePasswordSchema.parse(value)),
    validators: createFormValidators(ChangePasswordSchema),
  });
}
