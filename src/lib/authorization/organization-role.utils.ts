import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import {
  ORGANIZATION_ROLES,
  type OrganizationMemberRole,
  type OrganizationPermission,
} from '@/types/organization.types';

export function isOrganizationMemberRole(
  role?: null | string
): role is OrganizationMemberRole {
  return !!role && ORGANIZATION_ROLES.includes(role as OrganizationMemberRole);
}

export function hasOrganizationPermission(
  permissions: readonly string[] | undefined,
  permission: OrganizationPermission
) {
  return Boolean(permissions?.includes(permission));
}

export function getOrganizationRoleLabel(role: OrganizationMemberRole): string {
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
