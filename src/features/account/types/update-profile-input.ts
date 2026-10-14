import { z } from 'zod';
import { EmailSchema, StringSchema } from '@/lib/zod/schemas/field.schemas';

export const UpdateProfileSchema = z.object({
  email: EmailSchema,
  image: z.string().nullable().optional(),
  name: StringSchema,
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
