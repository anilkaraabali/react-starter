import { z } from 'zod';
import {
  emailFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

const updateProfileInputSchema = z.object({
  email: emailFieldSchema.optional(),
  image: z.string().nullable().optional(),
  name: stringFieldSchema.optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
