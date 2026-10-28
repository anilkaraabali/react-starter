import { Button, Dropdown, Label, Separator } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { BellIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { signOut, useSession } from '@/lib/auth-client';

export function AdminHeaderUserMenu() {
  const { t } = useLingui();
  const { data: session } = useSession();
  const user = session?.user;
  const navigate = useNavigate();

  const userName = user?.name || 'Admin';
  const email = user?.email;

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
            <p className='mt-0.5 truncate text-muted text-xs'>{email}</p>
          ) : null}
        </div>
        <Dropdown.Menu
          onAction={(key) => {
            if (key === 'settings') {
              navigate({ to: '/account' });
            }
            if (key === 'logout') {
              void handleLogout();
            }
          }}
        >
          <Dropdown.Item id='settings' textValue={t`Settings`}>
            <SettingsIcon className='text-muted' />
            <Label>{t`Settings`}</Label>
          </Dropdown.Item>

          <Dropdown.Item id='notifications' textValue={t`Notifications`}>
            <BellIcon className='text-muted' />
            <Label>{t`Notifications`}</Label>
            <span className='ms-auto rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] text-accent-soft-foreground'>
              4
            </span>
          </Dropdown.Item>

          <Separator className='my-1' />

          <Dropdown.Item id='logout' textValue={t`Log out`}>
            <LogOutIcon className='text-danger' />
            <Label className='text-danger'>{t`Log out`}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
