import { HttpResponse, http } from 'msw';
import type { OrganizationMemberRole } from '@/types/organization.types';
import {
  MOCK_MEMBERS,
  MOCK_ORGANIZATION_ME,
  MOCK_ORGANIZATION_MEMBERS,
  MOCK_SESSION,
  MOCK_USER,
} from './data';

const isLoggedOutInMock =
  typeof window !== 'undefined' &&
  sessionStorage.getItem('__mock_logged_out__') === 'true';

let currentUser: typeof MOCK_USER | null = isLoggedOutInMock
  ? null
  : { ...MOCK_USER };
let currentSession: typeof MOCK_SESSION | null = isLoggedOutInMock
  ? null
  : { ...MOCK_SESSION };
let organizationMe = { ...MOCK_ORGANIZATION_ME };
let organizationMembers = [...MOCK_MEMBERS];

export const handlers = [
  // -------------------------------------------------------------
  // Better-Auth Endpoints
  // -------------------------------------------------------------

  // Get current session
  http.get('*/api/auth/get-session', () => {
    if (!currentUser || !currentSession) {
      return HttpResponse.json(null, { status: 200 });
    }
    return HttpResponse.json({
      session: currentSession,
      user: currentUser,
    });
  }),

  // Sign in with Email
  http.post('*/api/auth/sign-in/email', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    currentUser = {
      ...MOCK_USER,
      email: body.email || MOCK_USER.email,
    };
    currentSession = {
      ...MOCK_SESSION,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('__mock_logged_out__');
    }
    return HttpResponse.json({
      session: currentSession,
      user: currentUser,
    });
  }),

  // Sign up with Email
  http.post('*/api/auth/sign-up/email', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      name?: string;
      password?: string;
    };
    currentUser = {
      ...MOCK_USER,
      email: body.email || MOCK_USER.email,
      name: body.name || MOCK_USER.name,
    };
    currentSession = {
      ...MOCK_SESSION,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('__mock_logged_out__');
    }
    return HttpResponse.json({
      session: currentSession,
      user: currentUser,
    });
  }),

  // Sign out
  http.post('*/api/auth/sign-out', () => {
    currentUser = null;
    currentSession = null;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('__mock_logged_out__', 'true');
    }
    return HttpResponse.json({ success: true });
  }),

  // List sessions
  http.get('*/api/auth/list-sessions', () => {
    if (!currentSession) {
      return HttpResponse.json([], { status: 200 });
    }
    return HttpResponse.json([currentSession]);
  }),

  // Revoke session
  http.post('*/api/auth/revoke-session', () => {
    currentUser = null;
    currentSession = null;
    return HttpResponse.json({ success: true });
  }),

  // Revoke other sessions
  http.post('*/api/auth/revoke-other-sessions', () => {
    return HttpResponse.json({ success: true });
  }),

  // Change password
  http.post('*/api/auth/change-password', () => {
    return HttpResponse.json({ success: true });
  }),

  // Forget password request
  http.post('*/api/auth/forget-password', () => {
    return HttpResponse.json({ status: true });
  }),

  // Reset password
  http.post('*/api/auth/reset-password', () => {
    return HttpResponse.json({ status: true });
  }),

  // Delete user
  http.post('*/api/auth/delete-user', () => {
    currentUser = null;
    currentSession = null;
    return HttpResponse.json({ success: true });
  }),

  // -------------------------------------------------------------
  // Organization & Account APIs
  // -------------------------------------------------------------

  // Get active organization details
  http.get('*/api/organizations/me', () => {
    return HttpResponse.json(organizationMe);
  }),

  // Rename organization
  http.patch('*/api/organizations/me', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { name?: string };
    if (body.name) {
      organizationMe = { ...organizationMe, organizationName: body.name };
    }
    return HttpResponse.json(organizationMe);
  }),

  // Get organization members
  http.get('*/api/organizations/members', () => {
    return HttpResponse.json({
      ...MOCK_ORGANIZATION_MEMBERS,
      members: organizationMembers,
      organizationName: organizationMe.organizationName,
    });
  }),

  // Add member
  http.post('*/api/organizations/members', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email: string;
      name: string;
      role?: OrganizationMemberRole;
    };
    const newMember = {
      banned: false,
      createdAt: new Date().toISOString(),
      email: body.email,
      id: `mem_${Date.now()}`,
      image: null,
      name: body.name,
      role: body.role || 'support_agent',
      userId: `usr_${Date.now()}`,
    };
    organizationMembers = [newMember, ...organizationMembers];
    return HttpResponse.json(newMember, { status: 201 });
  }),

  // Update member role
  http.patch(
    '*/api/organizations/members/:id/role',
    async ({ params, request }) => {
      const body = (await request.json().catch(() => ({}))) as {
        role: OrganizationMemberRole;
      };
      organizationMembers = organizationMembers.map((m) =>
        m.id === params.id ? { ...m, role: body.role } : m
      );
      return HttpResponse.json({ success: true });
    }
  ),

  // Ban or unban member
  http.patch(
    '*/api/organizations/members/:id/ban',
    async ({ params, request }) => {
      const body = (await request.json().catch(() => ({}))) as {
        banned: boolean;
      };
      organizationMembers = organizationMembers.map((m) =>
        m.userId === params.id ? { ...m, banned: body.banned } : m
      );
      return HttpResponse.json({ success: true });
    }
  ),

  // Remove member
  http.delete('*/api/organizations/members/:id', ({ params }) => {
    organizationMembers = organizationMembers.filter((m) => m.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  // Update profile
  http.patch('*/api/account/profile', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      name?: string;
    };
    if (currentUser) {
      currentUser = {
        ...currentUser,
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
      };
    }
    return HttpResponse.json(currentUser);
  }),
];
