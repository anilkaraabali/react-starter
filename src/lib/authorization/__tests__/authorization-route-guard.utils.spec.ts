import { QueryClient } from '@tanstack/react-query';
import { isRedirect } from '@tanstack/react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { OrganizationPermission } from '@/types/organization.types';
import { requireAuthorization } from '../authorization-route-guard.utils';

const ME_QUERY_KEY = ['/organizations/me'];
vi.mock('@/api/get-organization-me', () => ({
  getOrganizationMeQueryOptions: () => ({
    queryFn: () => Promise.reject(new Error('unexpected fetch')),
    queryKey: ME_QUERY_KEY,
  }),
}));

const GUEST_PERMISSIONS: OrganizationPermission[] = [];

function guardOptions(queryClient: QueryClient, pathname: string) {
  return { context: { queryClient }, location: { pathname } };
}

async function captureThrown(promise: Promise<unknown>) {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  return undefined;
}

describe('requireAuthorization', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setQueryData(ME_QUERY_KEY, {
      organizationId: 'org',
      organizationName: 'Org',
      permissions: GUEST_PERMISSIONS,
      role: 'sales_rep',
    });
  });

  it('resolves when the policy passes (uses the cached /organizations/me)', async () => {
    queryClient.setQueryData(ME_QUERY_KEY, {
      organizationId: 'org',
      organizationName: 'Org',
      permissions: [OrganizationPermission.organizationmemberslist],
      role: 'admin',
    });

    await expect(
      requireAuthorization(
        guardOptions(queryClient, APP_ROUTES.DASHBOARD),
        'members:list'
      )
    ).resolves.toBeUndefined();
  });

  it('redirects a guest without permission to the dashboard', async () => {
    const thrown = await captureThrown(
      requireAuthorization(
        guardOptions(queryClient, APP_ROUTES.ACCOUNT_ORGANIZATION),
        'members:list',
        APP_ROUTES.DASHBOARD
      )
    );

    expect(isRedirect(thrown)).toBe(true);
    expect((thrown as { options: { to: string } }).options.to).toBe(
      APP_ROUTES.DASHBOARD
    );
  });

  it('defaults the redirect to the dashboard', async () => {
    const thrown = await captureThrown(
      requireAuthorization(
        guardOptions(queryClient, APP_ROUTES.ACCOUNT_ORGANIZATION),
        'members:list'
      )
    );

    expect(isRedirect(thrown)).toBe(true);
    expect((thrown as { options: { to: string } }).options.to).toBe(
      APP_ROUTES.DASHBOARD
    );
  });

  it('redirects to an explicit target (account routes use the profile page)', async () => {
    const thrown = await captureThrown(
      requireAuthorization(
        guardOptions(queryClient, APP_ROUTES.ACCOUNT_ROLES),
        'members:list',
        APP_ROUTES.ACCOUNT_PROFILE
      )
    );

    expect(isRedirect(thrown)).toBe(true);
    expect((thrown as { options: { to: string } }).options.to).toBe(
      APP_ROUTES.ACCOUNT_PROFILE
    );
  });

  it('throws a forbidden error instead of redirecting to the current page', async () => {
    const thrown = await captureThrown(
      requireAuthorization(
        guardOptions(queryClient, APP_ROUTES.ACCOUNT_ORGANIZATION),
        'members:list',
        APP_ROUTES.ACCOUNT_ORGANIZATION
      )
    );

    expect(isRedirect(thrown)).toBe(false);
    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toBe(
      'You do not have permission to perform this action.'
    );
  });
});
