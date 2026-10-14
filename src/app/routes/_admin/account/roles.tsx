import { createFileRoute, Outlet } from '@tanstack/react-router';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { requireAuthorization } from '@/lib/authorization/authorization-route-guard.utils';

export const Route = createFileRoute('/_admin/account/roles')({
  beforeLoad: (opts) =>
    requireAuthorization(opts, 'members:list', APP_ROUTES.ACCOUNT_PROFILE),
  component: () => <Outlet />,
});
