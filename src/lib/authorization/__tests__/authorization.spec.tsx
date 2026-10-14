import { describe, expect, it, vi } from 'vitest';
import { Authorization } from '@/lib/authorization/authorization';
import type { AuthorizationContext } from '@/lib/authorization/authorization-policies.utils';
import { renderWithI18n } from '@/testing/render';
import { OrganizationPermission } from '@/types/organization.types';

const ctx = vi.hoisted(() => ({
  current: { permissions: [] } as AuthorizationContext,
}));

vi.mock('@/lib/authorization/use-authorization', () => ({
  useAuthorization: () => ({ ctx: ctx.current }),
}));

const granted = (permissions: OrganizationPermission[]) => {
  ctx.current = { permissions };
};

describe('Authorization', () => {
  it('renders the children when the policy passes', () => {
    granted([OrganizationPermission.organizationupdate]);

    const { container } = renderWithI18n(
      <Authorization policy='organization:update'>allowed</Authorization>
    );

    expect(container.textContent).toBe('allowed');
  });

  it('renders nothing when the policy fails and no fallback was given', () => {
    granted([]);

    const { container } = renderWithI18n(
      <Authorization policy='organization:update'>allowed</Authorization>
    );

    expect(container.textContent).toBe('');
  });

  it('renders the forbidden fallback when the policy fails', () => {
    granted([]);

    const { container } = renderWithI18n(
      <Authorization forbiddenFallback='no access' policy='organization:update'>
        allowed
      </Authorization>
    );

    expect(container.textContent).toBe('no access');
  });

  it('checks a resource policy against the resource it was given', () => {
    granted([OrganizationPermission.organizationmembersupdate_role]);

    const member = { role: 'admin', userId: 'u-2' } as const;

    const allowed = renderWithI18n(
      <Authorization policy='member:manage' resource={member}>
        allowed
      </Authorization>
    );
    expect(allowed.container.textContent).toBe('allowed');

    const forbidden = renderWithI18n(
      <Authorization
        policy='member:manage'
        resource={{ ...member, role: 'super_admin' }}
      >
        allowed
      </Authorization>
    );
    expect(forbidden.container.textContent).toBe('');
  });
});
