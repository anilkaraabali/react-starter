import { describe, expect, it } from 'vitest';
import {
  getOrganizationRoleLabel,
  hasOrganizationPermission,
  isOrganizationMemberRole,
} from '@/lib/authorization/organization-role.utils';
import { OrganizationPermission } from '@/types/organization.types';

describe('organization-role.utils', () => {
  describe('isOrganizationMemberRole', () => {
    it('accepts each role the API can return', () => {
      expect(isOrganizationMemberRole('super_admin')).toBe(true);
      expect(isOrganizationMemberRole('admin')).toBe(true);
      expect(isOrganizationMemberRole('support_agent')).toBe(true);
      expect(isOrganizationMemberRole('billing_admin')).toBe(true);
      expect(isOrganizationMemberRole('sales_rep')).toBe(true);
    });

    it('rejects anything else, so an invalid role cannot slip through', () => {
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
    it('is true only for a listed grant', () => {
      expect(
        hasOrganizationPermission(
          [OrganizationPermission.organizationupdate],
          OrganizationPermission.organizationupdate
        )
      ).toBe(true);
      expect(
        hasOrganizationPermission(
          [OrganizationPermission.organizationupdate],
          OrganizationPermission.organizationmemberslist
        )
      ).toBe(false);
    });

    it('treats a missing grant list as no access', () => {
      expect(
        hasOrganizationPermission(
          undefined,
          OrganizationPermission.organizationupdate
        )
      ).toBe(false);
      expect(
        hasOrganizationPermission([], OrganizationPermission.organizationupdate)
      ).toBe(false);
    });
  });

  describe('getOrganizationRoleLabel', () => {
    it('returns the translated label for a known role', () => {
      expect(getOrganizationRoleLabel('super_admin')).toBe('Super Admin');
      expect(getOrganizationRoleLabel('admin')).toBe('Admin');
      expect(getOrganizationRoleLabel('support_agent')).toBe('Support Agent');
      expect(getOrganizationRoleLabel('billing_admin')).toBe('Billing Admin');
      expect(getOrganizationRoleLabel('sales_rep')).toBe('Sales Rep');
    });

    it('falls back to the raw role for a value it does not know', () => {
      expect(
        getOrganizationRoleLabel(
          'custom_role' as Parameters<typeof getOrganizationRoleLabel>[0]
        )
      ).toBe('custom_role');
    });
  });
});
