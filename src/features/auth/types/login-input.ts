import { z } from 'zod';

import {
  emailFieldSchema,
  requiredPasswordFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

export const loginInputSchema = z.object({
  email: emailFieldSchema,
  password: requiredPasswordFieldSchema,
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginDefaultValues: LoginInput = {
  email: '',
  password: '',
};
