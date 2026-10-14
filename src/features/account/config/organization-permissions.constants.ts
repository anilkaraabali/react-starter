import {
  type OrganizationMemberRole,
  OrganizationPermission,
} from '@/types/organization.types';

/** Stable display order for the permission matrix. */
export const ORGANIZATION_PERMISSION_CATALOG = [
  OrganizationPermission.organizationupdate,
  OrganizationPermission.organizationmemberslist,
  OrganizationPermission.organizationmembersinvite,
  OrganizationPermission.organizationmembersupdate_role,
  OrganizationPermission.organizationmembersremove,
] as const satisfies readonly OrganizationPermission[];

/** Built-in role permissions. */
export const ROLE_PERMISSIONS: Record<
  OrganizationMemberRole,
  readonly OrganizationPermission[]
> = {
  admin: [
    OrganizationPermission.organizationmemberslist,
    OrganizationPermission.organizationmembersinvite,
    OrganizationPermission.organizationmembersupdate_role,
    OrganizationPermission.organizationmembersremove,
  ],
  billing_admin: [OrganizationPermission.organizationmemberslist],
  sales_rep: [OrganizationPermission.organizationmemberslist],
  super_admin: ORGANIZATION_PERMISSION_CATALOG,
  support_agent: [OrganizationPermission.organizationmemberslist],
};
