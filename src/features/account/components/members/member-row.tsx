import {
  Button,
  Chip,
  Dropdown,
  Label,
  ListBox,
  Select,
  Spinner,
  toast,
  useOverlayState,
} from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import {
  BanIcon,
  MoreHorizontalIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from 'lucide-react';
import type { Key } from 'react';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { useSetMemberBan } from '@/features/account/api/set-member-ban';
import { useUpdateMemberRole } from '@/features/account/api/update-member-role';
import { Account } from '@/features/account/components/blocks/account';
import type { OrganizationInviteRole } from '@/features/account/utils/member-role.utils';
import { ORGANIZATION_INVITE_ROLES } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import { useAuthorization } from '@/lib/authorization/use-authorization';
import {
  ORGANIZATION_ROLES,
  type OrganizationMemberDto,
} from '@/types/organization.types';
import { MemberBanModal } from './member-ban-modal';
import { MemberDeleteModal } from './member-delete-modal';

type MemberRowProps = {
  isCurrent: boolean;
  member: OrganizationMemberDto;
};

export function MemberRow({ isCurrent, member }: MemberRowProps) {
  const { t } = useLingui();
  const banModal = useOverlayState();
  const deleteModal = useOverlayState();
  const setMemberBanMutation = useSetMemberBan({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Member unbanned.`);
      },
    },
  });
  const updateMemberRoleMutation = useUpdateMemberRole({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Role updated.`);
      },
    },
  });
  const { can } = useAuthorization();
  const canManage = can('member:manage', member);
  const isUpdatingRole =
    updateMemberRoleMutation.isPending &&
    updateMemberRoleMutation.variables?.memberId === member.id;

  const handleRoleChange = (key: Key | null) => {
    const nextRole = String(
      Array.isArray(key) ? key[0] : key
    ) as OrganizationInviteRole;

    if (
      !canManage ||
      nextRole === member.role ||
      !ORGANIZATION_INVITE_ROLES.includes(nextRole)
    ) {
      return;
    }

    updateMemberRoleMutation.mutate({
      data: { role: nextRole },
      memberId: member.id,
    });
  };

  const handleUnban = () => {
    setMemberBanMutation.mutate({
      banned: false,
      userId: member.userId,
    });
  };

  return (
    <>
      <Account.Cell>
        <Account.CellLeadingItems>
          <UserAvatar name={member.name} />
          <Account.CellContent>
            <Account.CellLabel>
              <span className='flex flex-wrap items-center gap-2'>
                {member.name}
                {isCurrent ? (
                  <Chip color='success' size='sm' variant='soft'>
                    {t`You`}
                  </Chip>
                ) : null}
                {member.banned ? (
                  <Chip color='danger' size='sm' variant='soft'>
                    {t`Banned`}
                  </Chip>
                ) : null}
              </span>
            </Account.CellLabel>
            <Account.CellDescription>{member.email}</Account.CellDescription>
          </Account.CellContent>
        </Account.CellLeadingItems>
        <Account.CellTrailingItems className='items-center'>
          {canManage ? (
            <>
              <Select
                aria-label={t`Role for ${member.name}`}
                isDisabled={isUpdatingRole}
                onChange={handleRoleChange}
                value={member.role}
                variant='secondary'
              >
                <Select.Trigger className='min-w-28'>
                  {isUpdatingRole ? (
                    <Spinner color='current' size='sm' />
                  ) : (
                    <Select.Value />
                  )}
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {ORGANIZATION_ROLES.map((role) => (
                      <ListBox.Item
                        id={role}
                        key={role}
                        textValue={getOrganizationRoleLabel(role)}
                      >
                        {getOrganizationRoleLabel(role)}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              <Dropdown>
                <Button
                  aria-label={t`Actions for ${member.name}`}
                  isIconOnly
                  size='sm'
                  slot='trigger'
                  variant='tertiary'
                >
                  <MoreHorizontalIcon aria-hidden className='shrink-0' />
                </Button>
                <Dropdown.Popover placement='bottom end'>
                  <Dropdown.Menu aria-label={t`Actions for ${member.name}`}>
                    {member.banned ? (
                      <Dropdown.Item
                        id='unban'
                        onPress={handleUnban}
                        textValue={t`Unban user`}
                      >
                        <ShieldCheckIcon aria-hidden className='shrink-0' />
                        <Label>{t`Unban user`}</Label>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        id='ban'
                        onPress={banModal.open}
                        textValue={t`Ban user`}
                        variant='danger'
                      >
                        <BanIcon aria-hidden className='text-danger shrink-0' />
                        <Label>{t`Ban user`}</Label>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      id='remove'
                      onPress={deleteModal.open}
                      textValue={t`Remove member`}
                      variant='danger'
                    >
                      <Trash2Icon
                        aria-hidden
                        className='text-danger shrink-0'
                      />
                      <Label>{t`Remove member`}</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
          ) : (
            <Account.CellDescription>
              {getOrganizationRoleLabel(member.role)}
            </Account.CellDescription>
          )}
        </Account.CellTrailingItems>
      </Account.Cell>
      {canManage ? (
        <>
          <MemberBanModal
            isOpen={banModal.isOpen}
            member={member}
            onClose={banModal.close}
          />
          <MemberDeleteModal
            isOpen={deleteModal.isOpen}
            member={member}
            onClose={deleteModal.close}
          />
        </>
      ) : null}
    </>
  );
}
