import { Button, useOverlayState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

import { Account } from '@/features/account/components/blocks/account';
import { ChangePasswordModal } from './profile/change-password-modal';

export function AccountSecurityView() {
  const { t } = useLingui();
  const passwordModal = useOverlayState();

  return (
    <Account.SettingsChunk>
      <Account.PageHeader
        description={t(
          msg`Manage your password and configure additional security settings to keep your account safe.`
        )}
        title={t`Security`}
      />

      <Account.Sections>
        <Account.Section id='password'>
          <Account.SectionHeader title={t`Authentication`} />
          <Account.CellList>
            <Account.Row
              description={t(
                msg`Update your password to keep your account secure.`
              )}
              label={t`Password`}
            >
              <Button
                onPress={passwordModal.open}
                size='sm'
                variant='secondary'
              >
                {t`Change`}
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
