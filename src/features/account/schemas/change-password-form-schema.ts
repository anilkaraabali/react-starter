import { z } from 'zod';
import type { ChangePasswordInput } from '@/api/models/account/change-password-input';
import {
  passwordFieldSchema,
  requiredPasswordFieldSchema,
} from '@/lib/zod/schemas/field.schemas';
import { ValidationMessages } from '@/lib/zod/validation-messages';

export const changePasswordFormSchema = z
  .object({
    confirmPassword: requiredPasswordFieldSchema,
    currentPassword: requiredPasswordFieldSchema,
    newPassword: passwordFieldSchema,
    revokeOtherSessions: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: ValidationMessages.passwordMatch(),
        path: ['confirmPassword'],
      });
    }
    if (data.newPassword === data.currentPassword) {
      ctx.addIssue({
        code: 'custom',
        message: ValidationMessages.passwordSameAsCurrent(),
        path: ['newPassword'],
      });
    }
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export const changePasswordFormDefaultValues: ChangePasswordFormValues = {
  confirmPassword: '',
  currentPassword: '',
  newPassword: '',
  revokeOtherSessions: false,
};

export function mapChangePasswordFormToInput(
  values: ChangePasswordFormValues
): ChangePasswordInput {
  return {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
    revokeOtherSessions: values.revokeOtherSessions,
  };
}
