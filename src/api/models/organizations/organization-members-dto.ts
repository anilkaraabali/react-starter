import type { OrganizationMemberDto } from '@/api/models/organizations/organization-member-dto';

export type OrganizationMembersDto = {
  members: OrganizationMemberDto[];
  organizationId: string;
  organizationName: string;
};
