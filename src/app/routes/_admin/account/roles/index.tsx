import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import type { MetaFunction } from '@/app/router.types';
import { AccountRolesView } from '@/features/account/components/account-roles-view';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Roles & Permissions`),
  },
];

export const Route = createFileRoute('/_admin/account/roles/')({
  component: AccountRolesView,
  loader: () => ({ meta }),
});
