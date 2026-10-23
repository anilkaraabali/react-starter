import { createFileRoute, Outlet } from '@tanstack/react-router';
import { requireAuthorization } from '@/lib/authorization/authorization-route-guard.utils';

export const Route = createFileRoute('/_admin/account/roles')({
  beforeLoad: (opts) =>
    requireAuthorization(opts, 'members:list', '/account/profile'),
  component: () => <Outlet />,
});
