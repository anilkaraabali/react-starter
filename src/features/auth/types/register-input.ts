import { z } from 'zod';

import {
  emailFieldSchema,
  passwordFieldSchema,
  requiredPasswordFieldSchema,
  stringFieldSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const registerInputSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: requiredPasswordFieldSchema,
    email: emailFieldSchema,
    name: stringFieldSchema,
    password: passwordFieldSchema,
  })
);

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const registerDefaultValues: RegisterInput = {
  confirmPassword: '',
  email: '',
  name: '',
  password: '',
};
