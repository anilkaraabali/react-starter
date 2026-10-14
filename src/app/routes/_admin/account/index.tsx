import { createFileRoute, redirect } from '@tanstack/react-router';
import { APP_ROUTES } from '@/config/app-routes.constants';

export const Route = createFileRoute('/_admin/account/')({
  beforeLoad: () => {
    throw redirect({ to: APP_ROUTES.ACCOUNT_PROFILE });
  },
});
