import { z } from 'zod';
import {
  emailFieldSchema,
  passwordFieldSchema,
  requiredPasswordFieldSchema,
  stringFieldSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const registerFormSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: requiredPasswordFieldSchema,
    email: emailFieldSchema,
    name: stringFieldSchema,
    password: passwordFieldSchema,
  })
);

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const registerFormDefaultValues: RegisterFormValues = {
  confirmPassword: '',
  email: '',
  name: '',
  password: '',
};
