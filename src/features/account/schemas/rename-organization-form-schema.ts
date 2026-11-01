import type { z } from 'zod';
import { renameOrganizationInputSchema } from '@/api/models/account/rename-organization-input';

export const renameOrganizationFormSchema = renameOrganizationInputSchema;

export type RenameOrganizationFormValues = z.infer<
  typeof renameOrganizationFormSchema
>;

export const renameOrganizationFormDefaultValues: RenameOrganizationFormValues =
  {
    name: '',
  };
