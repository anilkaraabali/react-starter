import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
import { getOrganizationMeQueryOptions } from '@/api/get-organization-me';
import { APP_ROUTES } from '@/config/app-routes.constants';
import {
  checkPolicy,
  type ResourcelessPolicyName,
} from './authorization-policies.utils';

/** The slice of TanStack Router's `beforeLoad` options the guard needs. */
type AuthorizationGuardOptions = {
  context: { queryClient: QueryClient };
  location: { pathname: string };
};

function normalizePathname(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

/**
 * Route `beforeLoad` guard: redirects (default: `/dashboard`, which is only
 * session-guarded) unless `policy` passes.
 * The context has the organization's permissions and role, but no `userId`.
 *
 * `redirectTo` must not be guarded by the same policy. If it resolves to the
 * current page, this throws a forbidden error instead of redirecting forever.
 */
export async function requireAuthorization(
  { context, location }: AuthorizationGuardOptions,
  policy: ResourcelessPolicyName,
  redirectTo: string = APP_ROUTES.DASHBOARD
) {
  // `staleTime: 'static'` = former `ensureQueryData` semantics (use cache if present).
  const me = await context.queryClient.query({
    ...getOrganizationMeQueryOptions(),
    staleTime: 'static',
  });

  if (checkPolicy({ permissions: me.permissions, role: me.role }, policy)) {
    return;
  }

  if (normalizePathname(location.pathname) === normalizePathname(redirectTo)) {
    throw new Error(
      i18n._(msg`You do not have permission to perform this action.`)
    );
  }

  throw redirect({ to: redirectTo });
}
