import { z } from 'zod';

import { requiredPasswordFieldSchema } from '@/lib/zod/schemas/field.schemas';

export const deleteAccountInputSchema = z.object({
  password: requiredPasswordFieldSchema,
});

export type DeleteAccountInput = z.infer<typeof deleteAccountInputSchema>;

export const deleteAccountDefaultValues: DeleteAccountInput = {
  password: '',
};
