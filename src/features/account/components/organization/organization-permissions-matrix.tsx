import { cn, Table } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { ORGANIZATION_PERMISSION_LABELS } from '@/features/account/config/organization-permission-labels.constants';
import { ORGANIZATION_PERMISSION_CATALOG } from '@/features/account/config/organization-permissions.constants';
import { roleHasPermission } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';
import {
  ORGANIZATION_ROLES,
  type OrganizationMemberRole,
} from '@/types/organization.types';

type OrganizationPermissionsMatrixProps = {
  currentRole: OrganizationMemberRole;
};

export function OrganizationPermissionsMatrix({
  currentRole,
}: OrganizationPermissionsMatrixProps) {
  const { _ } = useLingui();

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={_(msg`Permission matrix`)}>
          <Table.Header>
            <Table.Column id='permission' isRowHeader>
              {_(msg`Permission`)}
            </Table.Column>
            {ORGANIZATION_ROLES.map((role) => (
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
                  {_(ORGANIZATION_PERMISSION_LABELS[permission])}
                </Table.Cell>
                {ORGANIZATION_ROLES.map((role) => {
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
                            ? _(msg`Granted to ${roleLabel}`)
                            : _(msg`Not granted to ${roleLabel}`)}
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
