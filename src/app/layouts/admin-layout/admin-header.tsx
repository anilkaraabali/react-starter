import { Button, Tooltip } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from 'lucide-react';
import { Header } from '@/components/organisms/header/header';
import { HeaderSearch } from '@/components/organisms/header/header-search';
import { usePreferences } from '@/stores/preferences-provider';
import { resolveTheme } from '@/utils/theme.utils';
import { AdminHeaderUserMenu } from './admin-header-user-menu';

type AdminHeaderProps = {
  onOpenMobileDrawer?: () => void;
};

export function AdminHeader({ onOpenMobileDrawer }: AdminHeaderProps) {
  const { t } = useLingui();
  const { open, setTheme, theme } = usePreferences();

  const resolved = resolveTheme(theme);

  const handleToggleTheme = () => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  };

  return (
    <Header
      avatarSlot={<AdminHeaderUserMenu />}
      customizeSlot={
        <Tooltip delay={0}>
          <Button
            aria-label={t`Customize appearance`}
            isIconOnly
            onPress={open}
            size='sm'
            variant='ghost'
          >
            <PaletteIcon />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {t`Customize appearance`}
          </Tooltip.Content>
        </Tooltip>
      }
      menuToggleSlot={
        <Button
          aria-label={t`Open menu`}
          className='lg:hidden'
          isIconOnly
          onPress={onOpenMobileDrawer}
          size='sm'
          variant='ghost'
        >
          <MenuIcon />
        </Button>
      }
      notificationsSlot={
        <Tooltip delay={0}>
          <Button
            aria-label={t`Notifications`}
            isIconOnly
            size='sm'
            variant='ghost'
          >
            <BellIcon />
            <span className='bg-danger absolute top-1.5 right-1.5 size-1.5 rounded-full' />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {t`Notifications`}
          </Tooltip.Content>
        </Tooltip>
      }
      searchSlot={<HeaderSearch />}
      themeSlot={
        <Tooltip delay={0}>
          <Button
            aria-label={t`Toggle theme`}
            isIconOnly
            onPress={handleToggleTheme}
            size='sm'
            variant='ghost'
          >
            {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {resolved === 'dark' ? t`Light mode` : t`Dark mode`}
          </Tooltip.Content>
        </Tooltip>
      }
    />
  );
}
