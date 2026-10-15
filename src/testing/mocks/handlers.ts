import { HttpResponse, http } from 'msw';
import type { OrganizationMemberRole } from '@/types/organization.types';
import {
  MOCK_MEMBERS,
  MOCK_ORGANIZATION_ME,
  MOCK_ORGANIZATION_MEMBERS,
  MOCK_PRODUCTS,
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
let productsList = [...MOCK_PRODUCTS];

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

  // -------------------------------------------------------------
  // Products Endpoints
  // -------------------------------------------------------------

  // List products with filtering & pagination
  http.get('*/api/products', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status');
    const dateStart = url.searchParams.get('dateStart');
    const dateEnd = url.searchParams.get('dateEnd');
    const sortBy = url.searchParams.get('sortBy');
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const pageSize = Math.max(
      1,
      Number(url.searchParams.get('pageSize') || 10)
    );

    let filtered = [...productsList];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search)
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    if (dateStart) {
      filtered = filtered.filter(
        (p) => new Date(p.createdAt) >= new Date(dateStart)
      );
    }

    if (dateEnd) {
      const endOfDay = new Date(dateEnd);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((p) => new Date(p.createdAt) <= endOfDay);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const valA = a[sortBy as keyof typeof a];
        const valB = b[sortBy as keyof typeof b];
        if (valA == null || valB == null) return 0;
        let comparison = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB;
        } else {
          comparison = String(valA).localeCompare(String(valB));
        }
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return HttpResponse.json({
      data: paginated,
      meta: {
        page,
        pageSize,
        total,
        totalPages,
      },
    });
  }),

  // Get single product
  http.get('*/api/products/:id', ({ params }) => {
    const product = productsList.find((p) => p.id === params.id);
    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    return HttpResponse.json(product);
  }),

  // Create product
  http.post('*/api/products', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const newProduct = {
      ...body,
      createdAt: new Date().toISOString(),
      id: `prod_${Date.now()}`,
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    productsList = [
      newProduct as (typeof productsList)[number],
      ...productsList,
    ];
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  // Update product
  http.patch('*/api/products/:id', async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const index = productsList.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    const current = productsList[index];
    if (typeof body.version === 'number' && body.version !== current.version) {
      return HttpResponse.json(
        {
          message:
            'Product has been modified by another process. Please refresh.',
        },
        { status: 409 }
      );
    }
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
      version: (current.version ?? 0) + 1,
    };
    productsList[index] = updated;
    return HttpResponse.json(updated);
  }),

  // Delete product
  http.delete('*/api/products/:id', ({ params }) => {
    productsList = productsList.filter((p) => p.id !== params.id);
    return HttpResponse.json({ success: true });
  }),
];
