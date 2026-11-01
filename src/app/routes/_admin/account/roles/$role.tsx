import { msg } from '@lingui/core/macro';
import { createFileRoute, redirect } from '@tanstack/react-router';
import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import { AccountRoleView } from '@/features/account/components/account-role-view';
import { isOrganizationMemberRole } from '@/lib/authorization/organization-role.utils';

function AccountRoleRouteComponent() {
  const { role } = Route.useParams();
  // `beforeLoad` below redirects anything that is not a member role, so this is
  // a narrowing cast, not an unchecked value.
  return <AccountRoleView role={role as OrganizationMemberRoleDto} />;
}

export const Route = createFileRoute('/_admin/account/roles/$role')({
  beforeLoad: async ({ params }) => {
    if (!isOrganizationMemberRole(params.role)) {
      throw redirect({ to: '/account/roles' });
    }
  },
  component: AccountRoleRouteComponent,
  staticData: { title: msg`Role` },
});
