import { z } from 'zod';
import {
  emailFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

export const updateProfileInputSchema = z.object({
  email: emailFieldSchema,
  image: z.string().nullable().optional(),
  name: stringFieldSchema,
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfileDefaultValues: UpdateProfileInput = {
  email: '',
  name: '',
};
