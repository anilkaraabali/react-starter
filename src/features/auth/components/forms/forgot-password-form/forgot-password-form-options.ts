import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type ForgotPasswordInput,
  ForgotPasswordSchema,
} from '@/features/auth/types/forgot-password-input';

const forgotPasswordDefaultValues: ForgotPasswordInput = {
  email: '',
};

type ForgotPasswordFormOptionsProps = {
  defaultValues?: Partial<ForgotPasswordInput>;
  onSubmit: (data: ForgotPasswordInput) => Promise<void> | void;
};

export function forgotPasswordFormOptions({
  defaultValues,
  onSubmit,
}: ForgotPasswordFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...forgotPasswordDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(ForgotPasswordSchema.parse(value)),
    validators: createFormValidators(ForgotPasswordSchema),
  });
}
