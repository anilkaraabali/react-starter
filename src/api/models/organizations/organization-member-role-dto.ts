export const OrganizationMemberRoleDto = {
  admin: 'admin',
  billing_admin: 'billing_admin',
  sales_rep: 'sales_rep',
  super_admin: 'super_admin',
  support_agent: 'support_agent',
} as const;

export type OrganizationMemberRoleDto =
  (typeof OrganizationMemberRoleDto)[keyof typeof OrganizationMemberRoleDto];
