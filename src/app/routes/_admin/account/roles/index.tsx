import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountRolesView } from '@/features/account/components/account-roles-view';

export const Route = createFileRoute('/_admin/account/roles/')({
  component: AccountRolesView,
  staticData: { title: msg`Roles & Permissions` },
});
