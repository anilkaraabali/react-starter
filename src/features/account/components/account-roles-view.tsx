import { Alert, Button, Chip, Skeleton, Typography } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useOrganizationMe } from '@/api/get-organization-me';
import { useOrganizationMembers } from '@/features/account/api/get-organization-members';
import { Account } from '@/features/account/components/blocks/account';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import { ORGANIZATION_ROLES } from '@/types/organization.types';
import { OrganizationPermissionsMatrix } from './organization/organization-permissions-matrix';
import { OrganizationRoleCard } from './organization/organization-role-card';

export function AccountRolesView() {
  const { t } = useLingui();
  const organizationMeQuery = useOrganizationMe();
  const membersQuery = useOrganizationMembers();
  const members = membersQuery.data?.members ?? [];
  const me = organizationMeQuery.data;

  const tabHeader = (
    <Account.PageHeader
      description={t(
        msg`Built-in roles and the permissions they grant in this organization.`
      )}
      title={t`Roles & Permissions`}
    />
  );

  if (membersQuery.isPending || organizationMeQuery.isPending) {
    return (
      <Account.SettingsChunk>
        {tabHeader}
        <div className='grid gap-4 sm:grid-cols-3'>
          {ORGANIZATION_ROLES.map((role) => (
            <Skeleton className='h-36 rounded-xl' key={role} />
          ))}
        </div>
        <Skeleton className='h-72 rounded-xl' />
      </Account.SettingsChunk>
    );
  }

  if (membersQuery.isError || organizationMeQuery.isError || !me) {
    return (
      <Account.SettingsChunk>
        {tabHeader}
        <Alert status='danger'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{t`Unable to load roles`}</Alert.Title>
            <Alert.Description>
              {t(
                msg`Something went wrong while loading roles. Please try again.`
              )}
            </Alert.Description>
            <Button
              className='mt-2'
              onPress={() => {
                void membersQuery.refetch();
                void organizationMeQuery.refetch();
              }}
              size='sm'
              variant='danger'
            >
              {t`Retry`}
            </Button>
          </Alert.Content>
        </Alert>
      </Account.SettingsChunk>
    );
  }

  return (
    <Account.SettingsChunk>
      {tabHeader}
      <Account.Sections>
        <Account.Section id='organization-roles'>
          <Account.SectionHeader title={t`Roles`} />
          <div className='grid gap-4 sm:grid-cols-3'>
            {ORGANIZATION_ROLES.map((role) => (
              <OrganizationRoleCard
                key={role}
                memberCount={
                  members.filter((member) => member.role === role).length
                }
                role={role}
              />
            ))}
          </div>
        </Account.Section>

        <Account.Section id='organization-permissions'>
          <Account.SectionHeader
            actions={
              <div className='flex items-center gap-1'>
                <Typography.Paragraph color='muted' size='sm'>
                  {t`Your current role`}:
                </Typography.Paragraph>
                <Chip color='accent' size='sm' variant='soft'>
                  {getOrganizationRoleLabel(me.role)}
                </Chip>
              </div>
            }
            title={t`Permission matrix`}
          />
          <OrganizationPermissionsMatrix currentRole={me.role} />
        </Account.Section>
      </Account.Sections>
    </Account.SettingsChunk>
  );
}
