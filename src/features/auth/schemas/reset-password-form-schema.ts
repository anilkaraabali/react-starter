import { z } from 'zod';
import {
  passwordFieldSchema,
  requiredPasswordFieldSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

export const resetPasswordFormSchema = withPasswordConfirmation(
  z.object({
    confirmPassword: requiredPasswordFieldSchema,
    password: passwordFieldSchema,
  })
);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export const resetPasswordFormDefaultValues: ResetPasswordFormValues = {
  confirmPassword: '',
  password: '',
};
