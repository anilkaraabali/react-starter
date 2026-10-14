import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AuthLayout } from '@/app/layouts/auth-layout/auth-layout';
import { APP_ROUTES } from '@/config/app-routes.constants';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth?.session) {
      throw redirect({ to: APP_ROUTES.DASHBOARD });
    }
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
