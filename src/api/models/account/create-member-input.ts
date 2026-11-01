import { z } from 'zod';
import { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import {
  emailFieldSchema,
  passwordFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

type OrganizationMemberRole =
  (typeof OrganizationMemberRoleDto)[keyof typeof OrganizationMemberRoleDto];

const organizationMemberRoleValues = Object.values(
  OrganizationMemberRoleDto
) as [OrganizationMemberRole, ...OrganizationMemberRole[]];

export const createMemberInputSchema = z.object({
  email: emailFieldSchema,
  name: stringFieldSchema,
  password: passwordFieldSchema,
  role: z.enum(organizationMemberRoleValues),
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;
