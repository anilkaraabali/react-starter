import { describe, expect, it } from 'vitest';
import type { AuthorizationContext } from '@/lib/authorization/authorization-policies.utils';
import {
  checkPolicy,
  POLICIES,
} from '@/lib/authorization/authorization-policies.utils';
import { OrganizationPermission } from '@/types/organization.types';

const ctx = (permissions: string[]): AuthorizationContext => ({
  permissions: permissions as unknown as AuthorizationContext['permissions'],
});

const noAccess = ctx([]);

describe('authorization-policies.utils', () => {
  describe('permission policies', () => {
    it('passes only when the grant is present', () => {
      const ctxOk = ctx([OrganizationPermission.organizationupdate]);

      expect(checkPolicy(ctxOk, 'organization:update')).toBe(true);
      expect(checkPolicy(noAccess, 'organization:update')).toBe(false);
    });

    it('does not let one grant stand in for another', () => {
      const ctxList = ctx([OrganizationPermission.organizationmemberslist]);

      expect(checkPolicy(ctxList, 'organization:update')).toBe(false);
    });
  });

  describe('member:manage', () => {
    const withUpdateRole = ctx([
      OrganizationPermission.organizationmembersupdate_role,
    ]);
    const member = { role: 'admin', userId: 'u-2' } as const;

    it('allows managing another member', () => {
      expect(checkPolicy(withUpdateRole, 'member:manage', { ...member })).toBe(
        true
      );
    });

    it('needs the permission', () => {
      expect(checkPolicy(noAccess, 'member:manage', { ...member })).toBe(false);
    });

    it('never allows managing yourself', () => {
      const self: AuthorizationContext = {
        permissions: [OrganizationPermission.organizationmembersupdate_role],
        userId: 'u-2',
      };

      expect(
        checkPolicy(self, 'member:manage', { role: 'admin', userId: 'u-2' })
      ).toBe(false);
    });

    it('never allows managing a super_admin', () => {
      expect(
        checkPolicy(withUpdateRole, 'member:manage', {
          role: 'super_admin',
          userId: 'u-9',
        })
      ).toBe(false);
    });
  });

  describe('POLICIES', () => {
    it('names every check after a single permission', () => {
      expect(Object.keys(POLICIES).sort()).toEqual([
        'member:manage',
        'members:invite',
        'members:list',
        'members:remove',
        'members:update-role',
        'organization:update',
      ]);
    });

    it('covers the permissions the app can receive', () => {
      expect(
        POLICIES['members:list'](
          ctx([OrganizationPermission.organizationmemberslist])
        )
      ).toBe(true);
      expect(
        POLICIES['organization:update'](
          ctx([OrganizationPermission.organizationupdate])
        )
      ).toBe(true);
    });
  });
});
