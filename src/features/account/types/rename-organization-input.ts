import { z } from 'zod';
import { stringFieldSchema } from '@/lib/zod/schemas/field.schemas';

export const renameOrganizationInputSchema = z.object({
  name: stringFieldSchema,
});

export type RenameOrganizationInput = z.infer<
  typeof renameOrganizationInputSchema
>;

export const renameOrganizationDefaultValues: RenameOrganizationInput = {
  name: '',
};
