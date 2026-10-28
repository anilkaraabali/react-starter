import { Button, Tooltip } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { LogOutIcon } from 'lucide-react';
import { useOrganizationMe } from '@/api/get-organization-me';
import { SidebarFooter } from '@/components/organisms/sidebar/footer/sidebar-footer';
import { SidebarUserLink } from '@/components/organisms/sidebar/footer/sidebar-user-link';
import { signOut, useSession } from '@/lib/auth-client';
import {
  getOrganizationRoleLabel,
  isOrganizationMemberRole,
} from '@/lib/authorization/organization-role.utils';

type AdminSidebarFooterProps = {
  isCollapsed?: boolean;
};

export function AdminSidebarFooter({
  isCollapsed = false,
}: AdminSidebarFooterProps) {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { data: session } = useSession();
  const user = session?.user;
  const organizationMeQuery = useOrganizationMe();

  const userName = user?.name || 'Admin';
  const organizationRole = organizationMeQuery.data?.role;
  const roleLabel = isOrganizationMemberRole(organizationRole)
    ? getOrganizationRoleLabel(organizationRole)
    : null;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/login';
        },
      },
    });
  };

  const handleAccountClick = () => {
    navigate({ to: '/account' });
  };

  return (
    <SidebarFooter compact={isCollapsed}>
      <SidebarUserLink
        compact={isCollapsed}
        href='/account'
        onPress={handleAccountClick}
        roleLabel={roleLabel}
        userName={userName}
      />
      {!isCollapsed && (
        <Tooltip delay={0}>
          <Button
            aria-label={t`Sign out`}
            isIconOnly
            onPress={() => void handleLogout()}
            size='sm'
            variant='ghost'
          >
            <LogOutIcon />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {t`Sign out`}
          </Tooltip.Content>
        </Tooltip>
      )}
    </SidebarFooter>
  );
}
