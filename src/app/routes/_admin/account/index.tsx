import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/account/')({
  beforeLoad: () => {
    throw redirect({ to: '/account/profile' });
  },
});
