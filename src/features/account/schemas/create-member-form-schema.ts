import type { z } from 'zod';
import { createMemberInputSchema } from '@/api/models/account/create-member-input';

export const createMemberFormSchema = createMemberInputSchema;

export type CreateMemberFormValues = z.infer<typeof createMemberFormSchema>;

export const createMemberFormDefaultValues: CreateMemberFormValues = {
  email: '',
  name: '',
  password: '',
  role: 'support_agent',
};
