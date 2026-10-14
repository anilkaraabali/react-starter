import { z } from 'zod';

import { RequiredPasswordSchema } from '@/lib/zod/schemas/field.schemas';

export const DeleteAccountSchema = z.object({
  password: RequiredPasswordSchema,
});

export type DeleteAccountInput = z.infer<typeof DeleteAccountSchema>;
