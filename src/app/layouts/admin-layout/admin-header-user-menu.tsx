import { Button, Dropdown, Label, Separator } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate } from '@tanstack/react-router';
import { BellIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { signOut, useSession } from '@/lib/auth-client';

export function AdminHeaderUserMenu() {
  const { _ } = useLingui();
  const { data: session } = useSession();
  const user = session?.user;
  const navigate = useNavigate();

  const userName = user?.name || 'Admin';
  const email = user?.email;

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
    <Dropdown>
      <Button aria-label={userName} isIconOnly size='sm' variant='ghost'>
        <UserAvatar
          className='transition-opacity hover:opacity-80'
          name={userName}
        />
      </Button>
      <Dropdown.Popover className='min-w-56'>
        <div className='border-b px-3 py-2.5'>
          <p className='font-semibold text-foreground text-sm leading-tight'>
            {userName}
          </p>
          {email ? (
            <p className='mt-0.5 truncate text-muted-foreground text-xs'>
              {email}
            </p>
          ) : null}
        </div>
        <Dropdown.Menu
          onAction={(key) => {
            if (key === 'settings') {
              navigate({ to: APP_ROUTES.ACCOUNT });
            }
            if (key === 'logout') {
              void handleLogout();
            }
          }}
        >
          <Dropdown.Item id='settings' textValue={_(msg`Settings`)}>
            <SettingsIcon className='text-muted' />
            <Label>{_(msg`Settings`)}</Label>
          </Dropdown.Item>

          <Dropdown.Item id='notifications' textValue={_(msg`Notifications`)}>
            <BellIcon className='text-muted' />
            <Label>{_(msg`Notifications`)}</Label>
            <span className='ms-auto rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] text-accent-soft-foreground'>
              4
            </span>
          </Dropdown.Item>

          <Separator className='my-1' />

          <Dropdown.Item id='logout' textValue={_(msg`Log out`)}>
            <LogOutIcon className='text-danger' />
            <Label className='text-danger'>{_(msg`Log out`)}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
