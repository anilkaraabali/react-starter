import { z } from 'zod';

import { EmailSchema } from '@/lib/zod/schemas/field.schemas';

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
