import { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';

type OrganizationMemberRole =
  (typeof OrganizationMemberRoleDto)[keyof typeof OrganizationMemberRoleDto];

/** Assignable organization roles in display order (UI, validation helpers). */
export const organizationMemberRoleOptions = Object.values(
  OrganizationMemberRoleDto
) as [OrganizationMemberRole, ...OrganizationMemberRole[]];
