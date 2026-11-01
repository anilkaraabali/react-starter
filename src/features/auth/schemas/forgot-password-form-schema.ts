import { z } from 'zod';

import { emailFieldSchema } from '@/lib/zod/schemas/field.schemas';

export const forgotPasswordFormSchema = z.object({
  email: emailFieldSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const forgotPasswordFormDefaultValues: ForgotPasswordFormValues = {
  email: '',
};
