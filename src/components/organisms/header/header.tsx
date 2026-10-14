import type { ReactNode } from 'react';

type HeaderProps = {
  actionsSlot?: ReactNode;
  avatarSlot?: ReactNode;
  customizeSlot?: ReactNode;
  menuToggleSlot?: ReactNode;
  notificationsSlot?: ReactNode;
  searchSlot?: ReactNode;
  themeSlot?: ReactNode;
};

export function Header({
  actionsSlot,
  avatarSlot,
  customizeSlot,
  menuToggleSlot,
  notificationsSlot,
  searchSlot,
  themeSlot,
}: HeaderProps) {
  return (
    <header className='sticky top-0 z-30'>
      <div className='flex h-(--header-height) items-center justify-between gap-3 border-(--header-edge-outline) border-b px-4 backdrop-blur-xl md:px-6'>
        <div className='flex items-center gap-3'>
          {menuToggleSlot}
          {searchSlot}
        </div>
        <div className='flex items-center gap-2'>
          {actionsSlot}
          {themeSlot}
          {customizeSlot}
          {notificationsSlot}
          {avatarSlot}
        </div>
      </div>
    </header>
  );
}
