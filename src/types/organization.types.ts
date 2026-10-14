export const ORGANIZATION_ROLES = [
  'admin',
  'billing_admin',
  'sales_rep',
  'super_admin',
  'support_agent',
] as const;

export type OrganizationMemberRole = (typeof ORGANIZATION_ROLES)[number];

export const OrganizationMemberRole = {
  admin: 'admin',
  billing_admin: 'billing_admin',
  sales_rep: 'sales_rep',
  super_admin: 'super_admin',
  support_agent: 'support_agent',
} as const;

export type OrganizationPermission =
  | 'organization.members.invite'
  | 'organization.members.list'
  | 'organization.members.remove'
  | 'organization.members.update_role'
  | 'organization.update';

export const OrganizationPermission = {
  organizationmembersinvite: 'organization.members.invite',
  organizationmemberslist: 'organization.members.list',
  organizationmembersremove: 'organization.members.remove',
  organizationmembersupdate_role: 'organization.members.update_role',
  organizationupdate: 'organization.update',
} as const;

export interface OrganizationMemberDto {
  banned: boolean;
  createdAt: string;
  email: string;
  id: string;
  image?: string | null;
  name: string;
  role: OrganizationMemberRole;
  userId: string;
}

export interface OrganizationMeResponseDto {
  organizationId: string;
  organizationName: string;
  permissions: OrganizationPermission[];
  role: OrganizationMemberRole;
}

export interface OrganizationMembersResponseDto {
  members: OrganizationMemberDto[];
  organizationId: string;
  organizationName: string;
}

export interface AccountProfileUpdateDto {
  image?: string | null;
  name?: string;
}
