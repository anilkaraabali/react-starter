import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AuthLayout } from '@/app/layouts/auth-layout/auth-layout';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth?.session) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
