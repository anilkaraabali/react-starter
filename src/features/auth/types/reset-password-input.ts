import { z } from 'zod';

import {
  passwordFieldSchema,
  requiredPasswordFieldSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const resetPasswordInputSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: requiredPasswordFieldSchema,
    password: passwordFieldSchema,
  })
);

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

export const resetPasswordDefaultValues: ResetPasswordInput = {
  confirmPassword: '',
  password: '',
};
