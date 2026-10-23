import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountOrganizationView } from '@/features/account/components/account-organization-view';
import { requireAuthorization } from '@/lib/authorization/authorization-route-guard.utils';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Organization`),
  },
];

export const Route = createFileRoute('/_admin/account/organization')({
  beforeLoad: (opts) =>
    requireAuthorization(opts, 'members:list', '/account/profile'),
  component: AccountOrganizationView,
  loader: () => ({ meta }),
});
