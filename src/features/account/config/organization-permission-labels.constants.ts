import { msg } from '@lingui/core/macro';
import type { MessageDescriptorMap } from '@/types/i18n.types';
import { OrganizationPermission } from '@/types/organization.types';

export const ORGANIZATION_PERMISSION_LABELS = {
  [OrganizationPermission.organizationmembersinvite]: msg`Add members`,
  [OrganizationPermission.organizationmemberslist]: msg`List members`,
  [OrganizationPermission.organizationmembersremove]: msg`Remove members`,
  [OrganizationPermission.organizationmembersupdate_role]: msg`Change member roles`,
  [OrganizationPermission.organizationupdate]: msg`Rename organization`,
} as const satisfies MessageDescriptorMap<OrganizationPermission>;
