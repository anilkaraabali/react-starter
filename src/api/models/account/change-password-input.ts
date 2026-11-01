import { z } from 'zod';
import {
  passwordFieldSchema,
  requiredPasswordFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

const changePasswordInputSchema = z.object({
  currentPassword: requiredPasswordFieldSchema,
  newPassword: passwordFieldSchema,
  revokeOtherSessions: z.boolean(),
});

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;
