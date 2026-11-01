import { describe, expect, it } from 'vitest';
import { OrganizationPermissionDto } from '@/api/models/organizations/organization-permission-dto';
import {
  getOrganizationRoleLabel,
  hasOrganizationPermission,
  isOrganizationMemberRole,
} from '@/lib/authorization/organization-role.utils';

describe('organization-role.utils', () => {
  describe('isOrganizationMemberRole', () => {
    it('accepts each role the API can return', () => {
      expect(isOrganizationMemberRole('super_admin')).toBe(true);
      expect(isOrganizationMemberRole('admin')).toBe(true);
      expect(isOrganizationMemberRole('support_agent')).toBe(true);
      expect(isOrganizationMemberRole('billing_admin')).toBe(true);
      expect(isOrganizationMemberRole('sales_rep')).toBe(true);
    });

    it('rejects unknown roles', () => {
      expect(isOrganizationMemberRole('owner')).toBe(false);
      expect(isOrganizationMemberRole('guest')).toBe(false);
      expect(isOrganizationMemberRole('member')).toBe(false);
      expect(isOrganizationMemberRole('SuperAdmin')).toBe(false);
      expect(isOrganizationMemberRole('')).toBe(false);
      expect(isOrganizationMemberRole(null)).toBe(false);
      expect(isOrganizationMemberRole(undefined)).toBe(false);
    });
  });

  describe('hasOrganizationPermission', () => {
    it('returns true when permission is present', () => {
      expect(
        hasOrganizationPermission(
          ['organization.update'],
          OrganizationPermissionDto.organizationUpdate
        )
      ).toBe(true);
      expect(
        hasOrganizationPermission(
          ['organization.members.list'],
          OrganizationPermissionDto.membersList
        )
      ).toBe(true);
    });

    it('returns false when permission is missing', () => {
      expect(
        hasOrganizationPermission(
          ['organization.update'],
          OrganizationPermissionDto.membersRemove
        )
      ).toBe(false);
      expect(
        hasOrganizationPermission(
          [],
          OrganizationPermissionDto.organizationUpdate
        )
      ).toBe(false);
    });
  });

  describe('getOrganizationRoleLabel', () => {
    it('returns a label for each known role', () => {
      expect(getOrganizationRoleLabel('super_admin')).toBe('Super Admin');
      expect(getOrganizationRoleLabel('admin')).toBe('Admin');
      expect(getOrganizationRoleLabel('support_agent')).toBe('Support Agent');
      expect(getOrganizationRoleLabel('billing_admin')).toBe('Billing Admin');
      expect(getOrganizationRoleLabel('sales_rep')).toBe('Sales Rep');
    });

    it('falls back to the raw role for unknown values', () => {
      expect(
        getOrganizationRoleLabel(
          'custom_role' as Parameters<typeof getOrganizationRoleLabel>[0]
        )
      ).toBe('custom_role');
    });
  });
});
