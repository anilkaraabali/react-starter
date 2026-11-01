import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import type { OrganizationPermissionDto } from '@/api/models/organizations/organization-permission-dto';
import { organizationMemberRoleOptions } from '@/lib/authorization/organization-member-role-options';

export function isOrganizationMemberRole(
  role?: null | string
): role is OrganizationMemberRoleDto {
  return (
    !!role &&
    organizationMemberRoleOptions.includes(role as OrganizationMemberRoleDto)
  );
}

export function hasOrganizationPermission(
  permissions: readonly string[] | undefined,
  permission: OrganizationPermissionDto
) {
  return Boolean(permissions?.includes(permission));
}

export function getOrganizationRoleLabel(
  role: OrganizationMemberRoleDto
): string {
  switch (role) {
    case 'super_admin':
      return i18n._(msg`Super Admin`);
    case 'admin':
      return i18n._(msg`Admin`);
    case 'support_agent':
      return i18n._(msg`Support Agent`);
    case 'billing_admin':
      return i18n._(msg`Billing Admin`);
    case 'sales_rep':
      return i18n._(msg`Sales Rep`);
    default:
      return role;
  }
}
