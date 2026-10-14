import type {
  OrganizationMemberDto,
  OrganizationMemberRole,
  OrganizationPermission,
} from '@/types/organization.types';
import { hasOrganizationPermission } from './organization-role.utils';

export type AuthorizationContext = {
  permissions: readonly OrganizationPermission[];
  role?: OrganizationMemberRole;
  userId?: string;
};

type Policy = (ctx: AuthorizationContext, resource: never) => boolean;

function permissionPolicy(permission: OrganizationPermission) {
  return (ctx: AuthorizationContext) =>
    hasOrganizationPermission(ctx.permissions, permission);
}

export const POLICIES = {
  'member:manage': (
    ctx: AuthorizationContext,
    member: Pick<OrganizationMemberDto, 'role' | 'userId'>
  ) =>
    hasOrganizationPermission(
      ctx.permissions,
      'organization.members.update_role'
    ) &&
    member.userId !== ctx.userId &&
    member.role !== 'super_admin',
  'members:invite': permissionPolicy('organization.members.invite'),
  'members:list': permissionPolicy('organization.members.list'),
  'members:remove': permissionPolicy('organization.members.remove'),
  'members:update-role': permissionPolicy('organization.members.update_role'),
  'organization:update': permissionPolicy('organization.update'),
} satisfies Record<string, Policy>;

export type PolicyName = keyof typeof POLICIES;

export type PolicyArgs<P extends PolicyName> =
  Parameters<(typeof POLICIES)[P]> extends [
    AuthorizationContext,
    infer TResource,
  ]
    ? [resource: TResource]
    : [];

export type ResourcelessPolicyName = {
  [P in PolicyName]: PolicyArgs<P> extends [] ? P : never;
}[PolicyName];

export function checkPolicy<P extends PolicyName>(
  ctx: AuthorizationContext,
  policy: P,
  ...args: PolicyArgs<P>
): boolean {
  const rule = POLICIES[policy] as (
    ctx: AuthorizationContext,
    resource?: unknown
  ) => boolean;

  return rule(ctx, args[0]);
}
