import { z } from 'zod';

import {
  EmailSchema,
  RequiredPasswordSchema,
} from '@/lib/zod/schemas/field.schemas';

export const LoginSchema = z.object({
  email: EmailSchema,
  password: RequiredPasswordSchema,
});

export type LoginInput = z.infer<typeof LoginSchema>;
