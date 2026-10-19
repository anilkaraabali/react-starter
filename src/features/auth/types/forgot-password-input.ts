import { z } from 'zod';

import { emailFieldSchema } from '@/lib/zod/schemas/field.schemas';

export const forgotPasswordInputSchema = z.object({
  email: emailFieldSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;

export const forgotPasswordDefaultValues: ForgotPasswordInput = {
  email: '',
};
