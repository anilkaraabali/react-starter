import type { ReactNode } from 'react';
import {
  checkPolicy,
  type PolicyArgs,
  type PolicyName,
} from './authorization-policies.utils';
import { useAuthorization } from './use-authorization';

type AuthorizationProps<P extends PolicyName> = {
  children: ReactNode;
  forbiddenFallback?: ReactNode;
  policy: P;
} & (PolicyArgs<P> extends [infer TResource]
  ? { resource: TResource }
  : { resource?: never });

/** Renders `children` only when `policy` passes (for resource policies, against `resource`). */
export function Authorization<P extends PolicyName>(
  props: AuthorizationProps<P>
) {
  const { children, forbiddenFallback = null, policy } = props;
  const { ctx } = useAuthorization();
  const args = [(props as { resource?: unknown }).resource] as PolicyArgs<P>;

  return checkPolicy(ctx, policy, ...args) ? children : forbiddenFallback;
}
