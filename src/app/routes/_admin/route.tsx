import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AdminLayout } from '@/app/layouts/admin-layout/admin-layout';
import { APP_ROUTES } from '@/config/app-routes.constants';

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ context }) => {
    if (!context.auth?.session) {
      throw redirect({ to: APP_ROUTES.LOGIN });
    }
  },
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
