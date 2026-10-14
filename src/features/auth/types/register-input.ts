import { z } from 'zod';

import {
  EmailSchema,
  PasswordSchema,
  RequiredPasswordSchema,
  StringSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const RegisterSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: RequiredPasswordSchema,
    email: EmailSchema,
    name: StringSchema,
    password: PasswordSchema,
  })
);

export type RegisterInput = z.infer<typeof RegisterSchema>;
