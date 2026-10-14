import { Button, Tooltip } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
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
  const { _ } = useLingui();
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
            aria-label={_(msg`Customize appearance`)}
            isIconOnly
            onPress={open}
            size='sm'
            variant='ghost'
          >
            <PaletteIcon />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {_(msg`Customize appearance`)}
          </Tooltip.Content>
        </Tooltip>
      }
      menuToggleSlot={
        <Button
          aria-label={_(msg`Open menu`)}
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
            aria-label={_(msg`Notifications`)}
            isIconOnly
            size='sm'
            variant='ghost'
          >
            <BellIcon />
            <span className='absolute top-1.5 right-1.5 size-1.5 rounded-full bg-danger' />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {_(msg`Notifications`)}
          </Tooltip.Content>
        </Tooltip>
      }
      searchSlot={<HeaderSearch />}
      themeSlot={
        <Tooltip delay={0}>
          <Button
            aria-label={_(msg`Toggle theme`)}
            isIconOnly
            onPress={handleToggleTheme}
            size='sm'
            variant='ghost'
          >
            {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            {resolved === 'dark' ? _(msg`Light mode`) : _(msg`Dark mode`)}
          </Tooltip.Content>
        </Tooltip>
      }
    />
  );
}
