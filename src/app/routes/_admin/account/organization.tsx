import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { APP_ROUTES } from '@/config/app-routes.constants';
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
    requireAuthorization(opts, 'members:list', APP_ROUTES.ACCOUNT_PROFILE),
  component: AccountOrganizationView,
  loader: () => ({ meta }),
});
