import type {
  OrganizationMemberDto,
  OrganizationMembersResponseDto,
  OrganizationMeResponseDto,
} from '@/types/organization.types';

export const MOCK_USER = {
  createdAt: '2026-01-01T00:00:00.000Z',
  email: 'admin@acme.com',
  emailVerified: true,
  id: 'usr_mock_admin',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  name: 'John Doe',
  role: 'admin',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export const MOCK_SESSION = {
  createdAt: '2026-01-01T00:00:00.000Z',
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  id: 'sess_mock_admin',
  ipAddress: '127.0.0.1',
  token: 'mock_token_123',
  updatedAt: '2026-01-01T00:00:00.000Z',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  userId: MOCK_USER.id,
};

export const MOCK_ORGANIZATION_ME: OrganizationMeResponseDto = {
  organizationId: 'org_mock_1',
  organizationName: 'Acme Admin Corp',
  permissions: [
    'organization.members.invite',
    'organization.members.list',
    'organization.members.remove',
    'organization.members.update_role',
    'organization.update',
  ],
  role: 'super_admin',
};

export const MOCK_MEMBERS: OrganizationMemberDto[] = [
  {
    banned: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    email: MOCK_USER.email,
    id: 'mem_1',
    image: MOCK_USER.image,
    name: MOCK_USER.name,
    role: 'super_admin',
    userId: MOCK_USER.id,
  },
  {
    banned: false,
    createdAt: '2026-01-05T00:00:00.000Z',
    email: 'sarah.connor@acme.com',
    id: 'mem_2',
    image: null,
    name: 'Sarah Connor',
    role: 'admin',
    userId: 'usr_sarah',
  },
  {
    banned: false,
    createdAt: '2026-01-10T00:00:00.000Z',
    email: 'support@acme.com',
    id: 'mem_3',
    image: null,
    name: 'Alex Rivera',
    role: 'support_agent',
    userId: 'usr_alex',
  },
  {
    banned: false,
    createdAt: '2026-01-15T00:00:00.000Z',
    email: 'billing@acme.com',
    id: 'mem_4',
    image: null,
    name: 'Emma Watson',
    role: 'billing_admin',
    userId: 'usr_emma',
  },
  {
    banned: false,
    createdAt: '2026-01-20T00:00:00.000Z',
    email: 'sales@acme.com',
    id: 'mem_5',
    image: null,
    name: 'Michael Scott',
    role: 'sales_rep',
    userId: 'usr_michael',
  },
];

export const MOCK_ORGANIZATION_MEMBERS: OrganizationMembersResponseDto = {
  members: MOCK_MEMBERS,
  organizationId: MOCK_ORGANIZATION_ME.organizationId,
  organizationName: MOCK_ORGANIZATION_ME.organizationName,
};
