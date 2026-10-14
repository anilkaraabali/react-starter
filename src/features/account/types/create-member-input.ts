import { z } from 'zod';
import {
  EmailSchema,
  PasswordSchema,
  StringSchema,
} from '@/lib/zod/schemas/field.schemas';
import { ORGANIZATION_ROLES } from '@/types/organization.types';

export const CreateMemberSchema = z.object({
  email: EmailSchema,
  name: StringSchema,
  password: PasswordSchema,
  role: z.enum(ORGANIZATION_ROLES),
});

export type CreateMemberInput = z.infer<typeof CreateMemberSchema>;
