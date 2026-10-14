import { useCallback, useMemo } from 'react';
import { useOrganizationMe } from '@/api/get-organization-me';
import { authClient } from '@/lib/auth-client';
import {
  type AuthorizationContext,
  checkPolicy,
  type PolicyArgs,
  type PolicyName,
} from './authorization-policies.utils';

/** Policy checks for the active organization. Denies everything while `/organizations/me` is loading. */
export function useAuthorization() {
  const { data, isPending } = useOrganizationMe();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const permissions = data?.permissions;
  const role = data?.role;

  const ctx = useMemo<AuthorizationContext>(
    () => ({ permissions: permissions ?? [], role, userId }),
    [permissions, role, userId]
  );

  const can = useCallback(
    <P extends PolicyName>(policy: P, ...args: PolicyArgs<P>) =>
      checkPolicy(ctx, policy, ...args),
    [ctx]
  );

  return { can, ctx, isPending };
}
