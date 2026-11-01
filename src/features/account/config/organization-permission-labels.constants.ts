import { msg } from '@lingui/core/macro';
import { OrganizationPermissionDto } from '@/api/models/organizations/organization-permission-dto';
import type { MessageDescriptorMap } from '@/types/i18n.types';

export const ORGANIZATION_PERMISSION_LABELS = {
  [OrganizationPermissionDto.membersInvite]: msg`Add members`,
  [OrganizationPermissionDto.membersList]: msg`List members`,
  [OrganizationPermissionDto.membersRemove]: msg`Remove members`,
  [OrganizationPermissionDto.membersUpdateRole]: msg`Change member roles`,
  [OrganizationPermissionDto.organizationUpdate]: msg`Rename organization`,
} as const satisfies MessageDescriptorMap<OrganizationPermissionDto>;
