import { Alert, Button, EmptyState, useOverlayState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { PlusIcon, UsersIcon } from 'lucide-react';
import { useOrganizationMe } from '@/api/get-organization-me';
import { useOrganizationMembers } from '@/features/account/api/get-organization-members';
import { Account } from '@/features/account/components/blocks/account';
import { useSession } from '@/lib/auth-client';
import { useAuthorization } from '@/lib/authorization/use-authorization';
import { CreateMemberModal } from './members/create-member-modal';
import { MemberRow } from './members/member-row';
import { OrganizationSkeleton } from './organization/organization-skeleton';
import { RenameOrganizationModal } from './organization/rename-organization-modal';

export function AccountOrganizationView() {
  const { t } = useLingui();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const organizationMeQuery = useOrganizationMe();
  const organizationMembersQuery = useOrganizationMembers();
  const { data, isError, isPending, refetch } = organizationMembersQuery;
  const members = data?.members ?? [];
  const organizationName =
    data?.organizationName ?? organizationMeQuery.data?.organizationName ?? '—';
  const { can } = useAuthorization();
  const canRename = can('organization:update');
  const canInvite = can('members:invite');
  const canManageRoles = can('members:update-role');
  const createModal = useOverlayState();
  const renameModal = useOverlayState();

  const tabHeader = (
    <Account.PageHeader
      description={t`Manage your organization details and team members.`}
      title={t`Organization`}
    />
  );

  if (isPending || organizationMeQuery.isPending) {
    return (
      <Account.SettingsChunk>
        {tabHeader}
        <OrganizationSkeleton />
      </Account.SettingsChunk>
    );
  }

  if (isError || organizationMeQuery.isError) {
    return (
      <Account.SettingsChunk>
        {tabHeader}
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
        <Account.Section id='organization-details'>
          <Account.SectionHeader title={t`General`} />
          <Account.CellList>
            <Account.Row
              description={organizationName}
              label={t`Organization name`}
            >
              {canRename ? (
                <Button
                  onPress={renameModal.open}
                  size='sm'
                  variant='secondary'
                >
                  {t`Rename`}
                </Button>
              ) : null}
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='members'>
          <Account.SectionHeader
            actions={
              canInvite ? (
                <Button
                  onPress={createModal.open}
                  size='sm'
                  variant='secondary'
                >
                  <PlusIcon />
                  {t`Add member`}
                </Button>
              ) : null
            }
            description={
              canManageRoles
                ? t(
                    msg`People in this organization. Invite guests or members, change roles, or remove them.`
                  )
                : t(
                    msg`People in this organization. Contact the owner to change membership.`
                  )
            }
            title={t`Members`}
          />
          {members.length === 0 ? (
            <EmptyState className='bg-surface flex flex-col items-center justify-center gap-3 rounded-xl border px-4 py-10 text-center'>
              <UsersIcon className='text-muted size-6!' />
              <span className='text-muted text-sm'>{t`No members found.`}</span>
            </EmptyState>
          ) : (
            <Account.CellList>
              {members.map((member) => (
                <MemberRow
                  isCurrent={member.userId === currentUser?.id}
                  key={member.id}
                  member={member}
                />
              ))}
            </Account.CellList>
          )}
        </Account.Section>
      </Account.Sections>

      {canInvite ? (
        <CreateMemberModal
          isOpen={createModal.isOpen}
          onClose={createModal.close}
        />
      ) : null}
      {canRename ? (
        <RenameOrganizationModal
          defaultName={organizationName === '—' ? '' : organizationName}
          isOpen={renameModal.isOpen}
          onClose={renameModal.close}
        />
      ) : null}
    </Account.SettingsChunk>
  );
}
