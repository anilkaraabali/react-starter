import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountRolesView } from '@/features/account/components/account-roles-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Roles & Permissions`),
  },
];

export const Route = createFileRoute('/_admin/account/roles/')({
  component: AccountRolesView,
  loader: () => ({ meta }),
});
