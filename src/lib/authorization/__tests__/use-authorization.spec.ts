import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OrganizationPermission } from '@/types/organization.types';

const me = vi.hoisted(() => ({
  data: undefined as { permissions?: string[]; role?: string } | undefined,
  isPending: false,
}));

const session = vi.hoisted(() => ({
  data: undefined as { user?: { id: string } } | undefined,
}));

vi.mock('@/api/get-organization-me', () => ({
  useOrganizationMe: () => me,
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: { useSession: () => session },
}));

import { useAuthorization } from '@/lib/authorization/use-authorization';

const ADMIN = {
  permissions: [OrganizationPermission.organizationupdate],
  role: 'super_admin',
};

describe('useAuthorization', () => {
  beforeEach(() => {
    me.data = undefined;
    me.isPending = false;
    session.data = { user: { id: 'u-1' } };
  });

  it('denies every policy while /organizations/me is still loading', () => {
    me.isPending = true;

    const { result } = renderHook(() => useAuthorization());

    expect(result.current.isPending).toBe(true);
    expect(result.current.can('members:list')).toBe(false);
    expect(result.current.can('organization:update')).toBe(false);
  });

  it('grants what the loaded organization allows', () => {
    me.data = ADMIN;

    const { result } = renderHook(() => useAuthorization());

    expect(result.current.can('organization:update')).toBe(true);
    expect(result.current.can('members:list')).toBe(false);
  });

  it('treats a missing payload as no permissions, not a crash', () => {
    me.data = undefined;

    const { result } = renderHook(() => useAuthorization());

    expect(result.current.ctx.permissions).toEqual([]);
    expect(result.current.can('members:list')).toBe(false);
  });

  it('carries the role and the signed-in user id into the context', () => {
    me.data = ADMIN;

    const { result } = renderHook(() => useAuthorization());

    expect(result.current.ctx.role).toBe('super_admin');
    expect(result.current.ctx.userId).toBe('u-1');
  });

  it('refuses member:manage against yourself, because ctx carries the user id', () => {
    me.data = {
      permissions: [OrganizationPermission.organizationmembersupdate_role],
      role: 'super_admin',
    };
    session.data = { user: { id: 'u-1' } };

    const { result } = renderHook(() => useAuthorization());

    expect(
      result.current.can('member:manage', { role: 'admin', userId: 'u-1' })
    ).toBe(false);
    expect(
      result.current.can('member:manage', { role: 'admin', userId: 'u-2' })
    ).toBe(true);
  });
});
