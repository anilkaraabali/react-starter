import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';

export type OrganizationMemberDto = {
  banned: boolean;
  createdAt: string;
  email: string;
  id: string;
  image?: string | null;
  name: string;
  role: OrganizationMemberRoleDto;
  userId: string;
};
