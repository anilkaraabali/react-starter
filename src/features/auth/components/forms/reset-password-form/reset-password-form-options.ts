import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type ResetPasswordInput,
  ResetPasswordSchema,
} from '@/features/auth/types/reset-password-input';

export const resetPasswordDefaultValues: ResetPasswordInput = {
  confirmPassword: '',
  password: '',
};

type ResetPasswordFormOptionsProps = {
  defaultValues?: Partial<ResetPasswordInput>;
  onSubmit: (data: ResetPasswordInput) => Promise<void> | void;
};

export function resetPasswordFormOptions({
  defaultValues,
  onSubmit,
}: ResetPasswordFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...resetPasswordDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(ResetPasswordSchema.parse(value)),
    validators: createFormValidators(ResetPasswordSchema),
  });
}
