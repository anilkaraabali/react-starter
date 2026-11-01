import { z } from 'zod';
import {
  emailFieldSchema,
  requiredPasswordFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

export const loginFormSchema = z.object({
  email: emailFieldSchema,
  password: requiredPasswordFieldSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormValues = {
  email: '',
  password: '',
};
