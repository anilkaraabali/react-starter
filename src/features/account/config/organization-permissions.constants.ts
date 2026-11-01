import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import { OrganizationPermissionDto } from '@/api/models/organizations/organization-permission-dto';
/** Stable display order for the permission matrix. */
export const ORGANIZATION_PERMISSION_CATALOG = [
  OrganizationPermissionDto.organizationUpdate,
  OrganizationPermissionDto.membersList,
  OrganizationPermissionDto.membersInvite,
  OrganizationPermissionDto.membersUpdateRole,
  OrganizationPermissionDto.membersRemove,
] as const satisfies readonly OrganizationPermissionDto[];

/** Built-in role permissions. */
export const ROLE_PERMISSIONS: Record<
  OrganizationMemberRoleDto,
  readonly OrganizationPermissionDto[]
> = {
  admin: [
    OrganizationPermissionDto.membersList,
    OrganizationPermissionDto.membersInvite,
    OrganizationPermissionDto.membersUpdateRole,
    OrganizationPermissionDto.membersRemove,
  ],
  billing_admin: [OrganizationPermissionDto.membersList],
  sales_rep: [OrganizationPermissionDto.membersList],
  super_admin: ORGANIZATION_PERMISSION_CATALOG,
  support_agent: [OrganizationPermissionDto.membersList],
};
