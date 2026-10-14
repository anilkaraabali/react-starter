import { Drawer, useOverlayState } from '@heroui/react';
import type { ReactNode } from 'react';
import { AdminCustomizeDrawer } from './admin-customize-drawer';
import { AdminHeader } from './admin-header';
import {
  ADMIN_SCROLL_CONTAINER_ID,
  CONTENT_PADDING,
  MAIN_CONTENT_ID,
} from './admin-layout.constants';
import { AdminSidebar } from './admin-sidebar';
import { useRouteLayoutOptions } from './use-route-layout-options';

type AdminLayoutProps = {
  children: ReactNode;
};

/** `/_admin` shell: sidebar, sticky header, scroll container and main landmark. */
export function AdminLayout({ children }: AdminLayoutProps) {
  const { contentPadding, hideHeader } = useRouteLayoutOptions();
  const mobileDrawer = useOverlayState();

  return (
    <div className='flex h-svh w-full overflow-hidden'>
      {/* Desktop Sidebar (always visible) */}
      <div className='relative hidden shrink-0 lg:flex'>
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      <Drawer>
        <Drawer.Backdrop
          isOpen={mobileDrawer.isOpen}
          onOpenChange={(open) => {
            if (!open) mobileDrawer.close();
          }}
        >
          <Drawer.Content className='max-w-70 p-0' placement='left'>
            <Drawer.Dialog className='flex h-full flex-col p-0'>
              <Drawer.CloseTrigger />
              <AdminSidebar isDrawer onNavigate={mobileDrawer.close} />
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <div className='flex min-h-0 min-w-0 flex-1 flex-col'>
        <div
          className='flex min-h-0 flex-1 flex-col overflow-y-auto'
          data-scroll-restoration-id={ADMIN_SCROLL_CONTAINER_ID}
          id={ADMIN_SCROLL_CONTAINER_ID}
        >
          {!hideHeader && (
            <AdminHeader onOpenMobileDrawer={mobileDrawer.open} />
          )}
          <main
            className={`min-w-0 flex-1 ${CONTENT_PADDING[contentPadding]}`}
            id={MAIN_CONTENT_ID}
            tabIndex={-1}
          >
            {children}
          </main>
        </div>
      </div>
      <AdminCustomizeDrawer />
    </div>
  );
}
