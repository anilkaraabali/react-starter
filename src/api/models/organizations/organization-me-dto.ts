import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import type { OrganizationPermissionDto } from '@/api/models/organizations/organization-permission-dto';

export type OrganizationMeDto = {
  organizationId: string;
  organizationName: string;
  permissions: OrganizationPermissionDto[];
  role: OrganizationMemberRoleDto;
};
