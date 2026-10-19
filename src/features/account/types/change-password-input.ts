import { z } from 'zod';

import {
  passwordFieldSchema,
  requiredPasswordFieldSchema,
} from '@/lib/zod/schemas/field.schemas';
import { ValidationMessages } from '@/lib/zod/validation-messages';

export const changePasswordInputSchema = z
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

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const changePasswordDefaultValues: ChangePasswordInput = {
  confirmPassword: '',
  currentPassword: '',
  newPassword: '',
  revokeOtherSessions: false,
};
