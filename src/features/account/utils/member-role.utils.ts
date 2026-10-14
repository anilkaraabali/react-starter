import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { ROLE_PERMISSIONS } from '@/features/account/config/organization-permissions.constants';
import type {
  OrganizationMemberRole,
  OrganizationPermission,
} from '@/types/organization.types';

export const ORGANIZATION_INVITE_ROLES = [
  'admin',
  'support_agent',
  'billing_admin',
  'sales_rep',
] as const;
export type OrganizationInviteRole = (typeof ORGANIZATION_INVITE_ROLES)[number];

export function roleHasPermission(
  role: OrganizationMemberRole,
  permission: OrganizationPermission
) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function getOrganizationRoleDescription(
  role: OrganizationMemberRole
): string {
  switch (role) {
    case 'super_admin':
      return i18n._(
        msg`Full access. Can manage organization settings, members, and all administrative functions.`
      );
    case 'admin':
      return i18n._(
        msg`Administrative access. Can manage team members and general settings.`
      );
    case 'support_agent':
      return i18n._(
        msg`Customer support access. Can view members and assist users.`
      );
    case 'billing_admin':
      return i18n._(
        msg`Billing and subscription access. Can manage payment and invoices.`
      );
    case 'sales_rep':
      return i18n._(
        msg`Sales access. Can view team directory and manage sales leads.`
      );
    default:
      return '';
  }
}
