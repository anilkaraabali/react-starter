import { Card, Chip, cn, linkVariants } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { LockIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import { ROLE_PERMISSIONS } from '@/features/account/config/organization-permissions.constants';
import { getOrganizationRoleDescription } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import type { OrganizationMemberRole } from '@/types/organization.types';

const link = linkVariants();

type OrganizationRoleCardProps = {
  memberCount: number;
  role: OrganizationMemberRole;
};

export function OrganizationRoleCard({
  memberCount,
  role,
}: OrganizationRoleCardProps) {
  const { t } = useLingui();
  const permissionCount = ROLE_PERMISSIONS[role].length;

  return (
    <Card className='flex h-full flex-col'>
      <Card.Header className='flex-1'>
        <div className='min-w-0 space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Card.Title>{getOrganizationRoleLabel(role)}</Card.Title>
            <Chip className='gap-1' size='sm' variant='secondary'>
              <LockIcon size={12} />
              {t`Built-in`}
            </Chip>
          </div>
          <Card.Description>
            {getOrganizationRoleDescription(role)}
          </Card.Description>
        </div>
      </Card.Header>
      <Card.Footer className='mt-auto flex items-center justify-between gap-3'>
        <div className='text-muted flex flex-wrap items-center gap-4 text-sm'>
          <span className='inline-flex items-center gap-1'>
            <ShieldCheckIcon />
            <span>{t`${permissionCount} permissions`}</span>
          </span>
          <span className='inline-flex items-center gap-1'>
            <UsersIcon />
            <span>{t`${memberCount} members`}</span>
          </span>
        </div>
        <Link
          className={cn(link.base(), 'text-accent text-sm')}
          params={{ role }}
          to='/account/roles/$role'
        >
          {t`View`}
        </Link>
      </Card.Footer>
    </Card>
  );
}
