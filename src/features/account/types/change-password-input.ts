import { z } from 'zod';

import {
  PasswordSchema,
  RequiredPasswordSchema,
} from '@/lib/zod/schemas/field.schemas';
import { ValidationMessages } from '@/lib/zod/validation-messages';

export const ChangePasswordSchema = z
  .object({
    confirmPassword: RequiredPasswordSchema,
    currentPassword: RequiredPasswordSchema,
    newPassword: PasswordSchema,
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

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
