import { z } from 'zod';
import { StringSchema } from '@/lib/zod/schemas/field.schemas';

export const RenameOrganizationSchema = z.object({
  name: StringSchema,
});

export type RenameOrganizationInput = z.infer<typeof RenameOrganizationSchema>;
