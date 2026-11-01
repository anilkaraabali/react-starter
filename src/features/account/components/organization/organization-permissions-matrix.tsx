import { cn, Table } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { CheckIcon, MinusIcon } from 'lucide-react';
import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import { ORGANIZATION_PERMISSION_LABELS } from '@/features/account/config/organization-permission-labels.constants';
import { ORGANIZATION_PERMISSION_CATALOG } from '@/features/account/config/organization-permissions.constants';
import { roleHasPermission } from '@/features/account/utils/member-role.utils';
import { organizationMemberRoleOptions } from '@/lib/authorization/organization-member-role-options';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';

type OrganizationPermissionsMatrixProps = {
  currentRole: OrganizationMemberRoleDto;
};

export function OrganizationPermissionsMatrix({
  currentRole,
}: OrganizationPermissionsMatrixProps) {
  const { t } = useLingui();

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={t`Permission matrix`}>
          <Table.Header>
            <Table.Column id='permission' isRowHeader>
              {t`Permission`}
            </Table.Column>
            {organizationMemberRoleOptions.map((role) => (
              <Table.Column id={role} key={role}>
                {getOrganizationRoleLabel(role)}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body
            items={ORGANIZATION_PERMISSION_CATALOG.map((permission) => ({
              id: permission,
            }))}
          >
            {({ id: permission }) => (
              <Table.Row id={permission}>
                <Table.Cell>
                  {t(ORGANIZATION_PERMISSION_LABELS[permission])}
                </Table.Cell>
                {organizationMemberRoleOptions.map((role) => {
                  const granted = roleHasPermission(role, permission);
                  const roleLabel = getOrganizationRoleLabel(role);

                  return (
                    <Table.Cell key={role}>
                      <span
                        className={cn(
                          'inline-flex',
                          role === currentRole ? 'text-accent' : 'text-muted'
                        )}
                      >
                        <span className='sr-only'>
                          {granted
                            ? t`Granted to ${roleLabel}`
                            : t`Not granted to ${roleLabel}`}
                        </span>
                        {granted ? (
                          <CheckIcon aria-hidden />
                        ) : (
                          <MinusIcon aria-hidden className='opacity-40' />
                        )}
                      </span>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
