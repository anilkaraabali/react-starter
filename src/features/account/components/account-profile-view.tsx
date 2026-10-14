import { Button, useOverlayState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { PencilLineIcon } from 'lucide-react';
import { useOrganizationMe } from '@/api/get-organization-me';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { ColorPalettePicker } from '@/components/molecules/color-palette-picker';
import { LanguagePicker } from '@/components/molecules/language-picker';
import { ThemePicker } from '@/components/molecules/theme-picker';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { DEFAULT_COLOR_PALETTE } from '@/config/color-palette.constants';
import { DEFAULT_THEME } from '@/config/theme.constants';
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
  const { _ } = useLingui();
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
          window.location.href = APP_ROUTES.LOGIN;
        },
      },
    });
  };

  return (
    <Account.SettingsChunk>
      <Account.PageHeader
        description={_(
          msg`Manage your profile, language, and appearance preferences.`
        )}
        title={_(msg`Settings`)}
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
                {_(msg`Edit profile`)}
              </Button>
            }
            title={_(msg`Personal Information`)}
          />
          <Account.CellList>
            <Account.Row
              className='items-start'
              label={_(msg`Avatar`)}
              trailingClassName='max-h-none items-stretch justify-items-end'
            >
              <UserAvatar name={user?.name} />
            </Account.Row>
            <Account.Row label={_(msg`Full name`)}>
              <Account.CellDescription>
                {user?.name || '—'}
              </Account.CellDescription>
            </Account.Row>
            <Account.Row label={_(msg`Email`)}>
              <Account.CellDescription>
                {user?.email || '—'}
              </Account.CellDescription>
            </Account.Row>
            <Account.Row label={_(msg`Organization role`)}>
              <Account.CellDescription>{roleLabel}</Account.CellDescription>
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='language'>
          <Account.SectionHeader title={_(msg`Language & Region`)} />
          <Account.CellList>
            <Account.Row label={_(msg`Interface language`)}>
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
                {_(msg`Reset to defaults`)}
              </Button>
            }
            title={_(msg`Appearance`)}
          />
          <Account.CellList>
            <Account.Row label={_(msg`Theme`)}>
              <ThemePicker />
            </Account.Row>
            <Account.Row
              description={_(
                msg`Choose a primary color for buttons, links, and active states.`
              )}
              label={_(msg`Color scheme`)}
            >
              <ColorPalettePicker />
            </Account.Row>
          </Account.CellList>
        </Account.Section>

        <Account.Section id='more'>
          <Account.SectionHeader title={_(msg`More`)} />
          <Account.CellList>
            <Account.Row label={_(msg`End your session on this device`)}>
              <Button
                onPress={() => {
                  void handleLogout();
                }}
                size='sm'
                variant='secondary'
              >
                {_(msg`Log out`)}
              </Button>
            </Account.Row>
            <Account.Row label={_(msg`Delete my account`)}>
              <Button onPress={deleteModal.open} size='sm' variant='danger'>
                {_(msg`Delete`)}
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
