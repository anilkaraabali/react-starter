import { msg } from '@lingui/core/macro';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AccountRoleView } from '@/features/account/components/account-role-view';
import { isOrganizationMemberRole } from '@/lib/authorization/organization-role.utils';
import type { MetaFunction } from '@/types/meta.types';
import type { OrganizationMemberRole } from '@/types/organization.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Role`),
  },
];

function AccountRoleRouteComponent() {
  const { role } = Route.useParams();
  // `beforeLoad` below redirects anything that is not a member role, so this is
  // a narrowing cast, not an unchecked value.
  return <AccountRoleView role={role as OrganizationMemberRole} />;
}

export const Route = createFileRoute('/_admin/account/roles/$role')({
  beforeLoad: async ({ params }) => {
    if (!isOrganizationMemberRole(params.role)) {
      throw redirect({ to: '/account/roles' });
    }
  },
  component: AccountRoleRouteComponent,
  loader: () => ({ meta }),
});
