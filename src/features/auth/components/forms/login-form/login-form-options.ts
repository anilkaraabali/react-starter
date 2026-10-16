import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type LoginInput,
  LoginSchema,
} from '@/features/auth/types/login-input';

const loginDefaultValues: LoginInput = {
  email: '',
  password: '',
};

type LoginFormOptionsProps = {
  defaultValues?: Partial<LoginInput>;
  onSubmit: (data: LoginInput) => Promise<void> | void;
};

export function loginFormOptions({
  defaultValues,
  onSubmit,
}: LoginFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...loginDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(LoginSchema.parse(value)),
    validators: createFormValidators(LoginSchema),
  });
}
