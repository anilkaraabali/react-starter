import { z } from 'zod';

import {
  PasswordSchema,
  RequiredPasswordSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const ResetPasswordSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: RequiredPasswordSchema,
    password: PasswordSchema,
  })
);

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
