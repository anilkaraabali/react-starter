import { Button, useOverlayState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { PencilLineIcon } from 'lucide-react';
import { useOrganizationMe } from '@/api/get-organization-me';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { ColorPalettePicker } from '@/components/molecules/color-palette-picker';
import { LanguagePicker } from '@/components/molecules/language-picker';
import { ThemePicker } from '@/components/molecules/theme-picker';
import { DEFAULT_COLOR_PALETTE } from '@/config/color-palette';
import { DEFAULT_THEME } from '@/config/theme';
import { Account } from '@/features/account/components/blocks/account';
import { signOut, useSession } from '@/lib/auth-client';
import {
  getOrganizationRoleLabel,
  isOrganizationMemberRole,
} from '@/lib/authorization/organization-role.utils';
import { usePreferences } from '@/stores/preferences-provider';
import { DeleteAccountModal } from './profile/delete-account-modal';
import { UpdateProfileModal } from './profile/update-profile-modal';

export function AccountProfileView() {
  const { t } = useLingui();
  const { data: session } = useSession();
  const user = session?.user;
  const organizationMeQuery = useOrganizationMe();
  const editModal = useOverlayState();
  const deleteModal = useOverlayState();
  const { palette, resetToDefaults, theme } = usePreferences();
  const isAppearanceDefault =
    theme === DEFAULT_THEME && palette === DEFAULT_COLOR_PALETTE;
  const organizationRole = organizationMeQuery.data?.role;
  const roleLabel = isOrganizationMemberRole(organizationRole)
    ? getOrganizationRoleLabel(organizationRole)
    : '—';

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/login';
        },
      },
    });
  };

  return (
    <Account.SettingsChunk>
      <Account.PageHeader
        description={t(
          msg`Manage your profile, language, and appearance preferences.`
        )}
        title={t`Settings`}
      />

      <Account.Sections>
        <Account.Section id='profile'>
          <Account.SectionHeader
            actions={
              <Button
                isDisabled={!user}
                onPress={editModal.open}
                size='sm'
                variant='secondary'
              >
                <PencilLineIcon />
                {t`Edit profile`}
              </Button>
            }
            title={t`Personal Information`}
          />
          <Account.CellList>
            <Account.Row
              className='items-start'
              label={t`Avatar`}
              trailingClassName='max-h-none items-stretch justify-items-end'
            >
              <UserAvatar name={user?.name} />
            </Account.Row>
            <Account.Row label={t`Full name`}>
              <Account.CellDescription>
                {user?.name || '—'}
              </Account.CellDescription>
            </Account.Row>
            <Account.Row label={t`Email`}>
              <Account.CellDescription>
                {user?.email || '—'}
              </Account.CellDescription>
            </Account.Row>
            <Account.Row label={t`Organization role`}>
              <Account.CellDescription>{roleLabel}</Account.CellDescription>
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='language'>
          <Account.SectionHeader title={t`Language & Region`} />
          <Account.CellList>
            <Account.Row label={t`Interface language`}>
              <LanguagePicker />
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='appearance'>
          <Account.SectionHeader
            actions={
              <Button
                isDisabled={isAppearanceDefault}
                onPress={resetToDefaults}
                size='sm'
                variant='secondary'
              >
                {t`Reset to defaults`}
              </Button>
            }
            title={t`Appearance`}
          />
          <Account.CellList>
            <Account.Row label={t`Theme`}>
              <ThemePicker />
            </Account.Row>
            <Account.Row
              description={t(
                msg`Choose a primary color for buttons, links, and active states.`
              )}
              label={t`Color scheme`}
            >
              <ColorPalettePicker />
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='more'>
          <Account.SectionHeader title={t`More`} />
          <Account.CellList>
            <Account.Row label={t`End your session on this device`}>
              <Button
                onPress={() => {
                  void handleLogout();
                }}
                size='sm'
                variant='secondary'
              >
                {t`Log out`}
              </Button>
            </Account.Row>
            <Account.Row label={t`Delete my account`}>
              <Button onPress={deleteModal.open} size='sm' variant='danger'>
                {t`Delete`}
              </Button>
            </Account.Row>
          </Account.CellList>
        </Account.Section>
      </Account.Sections>

      {user ? (
        <UpdateProfileModal
          defaultValues={{
            email: user.email ?? '',
            name: user.name ?? '',
          }}
          isOpen={editModal.isOpen}
          onClose={editModal.close}
        />
      ) : null}
      <DeleteAccountModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
      />
    </Account.SettingsChunk>
  );
}
