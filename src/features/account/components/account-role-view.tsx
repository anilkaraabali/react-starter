import {
  Alert,
  Button,
  buttonVariants,
  EmptyState,
  Skeleton,
} from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { ShieldIcon, UsersIcon } from 'lucide-react';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { useOrganizationMembers } from '@/features/account/api/get-organization-members';
import { Account } from '@/features/account/components/blocks/account';
import { ORGANIZATION_PERMISSION_LABELS } from '@/features/account/config/organization-permission-labels.constants';
import { ROLE_PERMISSIONS } from '@/features/account/config/organization-permissions.constants';
import { getOrganizationRoleDescription } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import type { OrganizationMemberRole } from '@/types/organization.types';

type AccountRolePageProps = {
  role: OrganizationMemberRole;
};

export function AccountRoleView({ role }: AccountRolePageProps) {
  const { t } = useLingui();
  const { data, isError, isPending, refetch } = useOrganizationMembers();
  const members = data?.members.filter((member) => member.role === role) ?? [];

  const tabHeader = (
    <Account.PageHeader
      description={getOrganizationRoleDescription(role)}
      title={getOrganizationRoleLabel(role)}
    />
  );

  const allRolesLink = (
    <Link
      className={buttonVariants({ size: 'sm', variant: 'secondary' })}
      to='/account/roles'
    >
      <ShieldIcon />
      {t`All roles`}
    </Link>
  );

  return (
    <Account.SettingsChunk>
      {tabHeader}
      <Account.Sections>
        <Account.Section id='role-permissions'>
          <Account.SectionHeader
            actions={allRolesLink}
            title={t`Permissions`}
          />
          <Account.CellList>
            {ROLE_PERMISSIONS[role].map((permission) => (
              <Account.Row
                description={<code className='text-xs'>{permission}</code>}
                key={permission}
                label={t(ORGANIZATION_PERMISSION_LABELS[permission])}
              />
            ))}
          </Account.CellList>
        </Account.Section>

        <Account.Section id='role-members'>
          <Account.SectionHeader title={t`Members with this role`} />
          {isPending ? (
            <Skeleton className='h-16 rounded-xl' />
          ) : isError ? (
            <Alert status='danger'>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{t`Unable to load members`}</Alert.Title>
                <Alert.Description>
                  {t(
                    msg`Something went wrong while loading members. Please try again.`
                  )}
                </Alert.Description>
                <Button
                  className='mt-2'
                  onPress={() => {
                    void refetch();
                  }}
                  size='sm'
                  variant='danger'
                >
                  {t`Retry`}
                </Button>
              </Alert.Content>
            </Alert>
          ) : members.length === 0 ? (
            <EmptyState className='bg-surface flex flex-col items-center justify-center gap-3 rounded-xl border px-4 py-10 text-center'>
              <UsersIcon className='text-muted size-6!' />
              <span className='text-muted text-sm'>
                {t`No members currently hold this role.`}
              </span>
            </EmptyState>
          ) : (
            <Account.CellList>
              {members.map((member) => (
                <Account.Cell key={member.id}>
                  <Account.CellLeadingItems>
                    <UserAvatar name={member.name} />
                    <Account.CellContent>
                      <Account.CellLabel>{member.name}</Account.CellLabel>
                      <Account.CellDescription>
                        {member.email}
                      </Account.CellDescription>
                    </Account.CellContent>
                  </Account.CellLeadingItems>
                </Account.Cell>
              ))}
            </Account.CellList>
          )}
        </Account.Section>
      </Account.Sections>
    </Account.SettingsChunk>
  );
}
