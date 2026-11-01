import type { z } from 'zod';
import { deleteAccountInputSchema } from '@/api/models/account/delete-account-input';

export const deleteAccountFormSchema = deleteAccountInputSchema;

export type DeleteAccountFormValues = z.infer<typeof deleteAccountFormSchema>;

export const deleteAccountFormDefaultValues: DeleteAccountFormValues = {
  password: '',
};
