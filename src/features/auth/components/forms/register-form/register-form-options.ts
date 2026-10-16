import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type RegisterInput,
  RegisterSchema,
} from '@/features/auth/types/register-input';

const registerDefaultValues: RegisterInput = {
  confirmPassword: '',
  email: '',
  name: '',
  password: '',
};

type RegisterFormOptionsProps = {
  defaultValues?: Partial<RegisterInput>;
  onSubmit: (data: RegisterInput) => Promise<void> | void;
};

export function registerFormOptions({
  defaultValues,
  onSubmit,
}: RegisterFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...registerDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(RegisterSchema.parse(value)),
    validators: createFormValidators(RegisterSchema),
  });
}
