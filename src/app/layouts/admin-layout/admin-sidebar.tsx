import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Sidebar } from '@/components/organisms/sidebar/sidebar';
import { usePreferences } from '@/stores/preferences-provider';
import { AdminSidebarFooter } from './admin-sidebar-footer';
import { useSidebarItems } from './use-sidebar-items';

type AdminSidebarProps = {
  isDrawer?: boolean;
  onNavigate?: () => void;
};

export function AdminSidebar({
  isDrawer = false,
  onNavigate,
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const { headerMode, items } = useSidebarItems();
  const { sidebarVariant } = usePreferences();

  const handleNavigate = (to: string) => {
    navigate({ to });
    onNavigate?.();
  };

  return (
    <Sidebar
      currentPath={currentPath}
      footer={({ isCollapsed }) => (
        <AdminSidebarFooter isCollapsed={isCollapsed} />
      )}
      headerMode={headerMode}
      isDrawer={isDrawer}
      items={items}
      onBackToDashboard={() => navigate({ to: '/dashboard' })}
      onNavigate={handleNavigate}
      variant={isDrawer ? 'default' : sidebarVariant}
    />
  );
}
