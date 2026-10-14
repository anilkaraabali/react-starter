import { Button, useOverlayState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { Account } from '@/features/account/components/blocks/account';
import { ChangePasswordModal } from './profile/change-password-modal';

export function AccountSecurityView() {
  const { _ } = useLingui();
  const passwordModal = useOverlayState();

  return (
    <Account.SettingsChunk>
      <Account.PageHeader
        description={_(
          msg`Manage your password and configure additional security settings to keep your account safe.`
        )}
        title={_(msg`Security`)}
      />

      <Account.Sections>
        <Account.Section id='password'>
          <Account.SectionHeader title={_(msg`Authentication`)} />
          <Account.CellList>
            <Account.Row
              description={_(
                msg`Update your password to keep your account secure.`
              )}
              label={_(msg`Password`)}
            >
              <Button
                onPress={passwordModal.open}
                size='sm'
                variant='secondary'
              >
                {_(msg`Change`)}
              </Button>
            </Account.Row>
          </Account.CellList>
        </Account.Section>
      </Account.Sections>

      <ChangePasswordModal
        isOpen={passwordModal.isOpen}
        onClose={passwordModal.close}
      />
    </Account.SettingsChunk>
  );
}
