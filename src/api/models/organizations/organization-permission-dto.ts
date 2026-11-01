export const OrganizationPermissionDto = {
  membersInvite: 'organization.members.invite',
  membersList: 'organization.members.list',
  membersRemove: 'organization.members.remove',
  membersUpdateRole: 'organization.members.update_role',
  organizationUpdate: 'organization.update',
} as const;

export type OrganizationPermissionDto =
  (typeof OrganizationPermissionDto)[keyof typeof OrganizationPermissionDto];
