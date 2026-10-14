import type { SidebarNavItem } from '../sidebar.types';
import { isPathActive } from '../sidebar.utils';
import { SidebarMenuButton } from './sidebar-menu-button';

type SidebarMenuItemProps = {
  currentPath: string;
  isCompact?: boolean;
  isExpanded: boolean;
  item: SidebarNavItem;
  onClose?: () => void;
  onNavigate?: (to: string) => void;
};

export function SidebarMenuItem({
  currentPath,
  isCompact = false,
  isExpanded,
  item,
  onClose,
  onNavigate,
}: SidebarMenuItemProps) {
  const isItemActive = isPathActive(currentPath, item.to);

  const handlePress = () => {
    onClose?.();
    onNavigate?.(item.to);
  };

  return (
    <SidebarMenuButton
      isActive={isItemActive}
      isCompact={isCompact}
      isExpanded={isExpanded}
      item={item}
      onPress={handlePress}
    />
  );
}
