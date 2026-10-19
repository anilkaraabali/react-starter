import { z } from 'zod';
import {
  emailFieldSchema,
  passwordFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';
import { ORGANIZATION_ROLES } from '@/types/organization.types';

export const createMemberInputSchema = z.object({
  email: emailFieldSchema,
  name: stringFieldSchema,
  password: passwordFieldSchema,
  role: z.enum(ORGANIZATION_ROLES),
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;

export const createMemberDefaultValues: CreateMemberInput = {
  email: '',
  name: '',
  password: '',
  role: 'support_agent',
};
