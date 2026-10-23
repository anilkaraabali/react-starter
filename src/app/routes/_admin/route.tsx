import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AdminLayout } from '@/app/layouts/admin-layout/admin-layout';

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ context }) => {
    if (!context.auth?.session) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
