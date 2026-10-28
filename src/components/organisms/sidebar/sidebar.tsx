import { cn, Separator } from '@heroui/react';
import type { ReactNode } from 'react';

import { SidebarHeader } from './header/sidebar-header';
import { SidebarToggleButton } from './header/sidebar-toggle-button';
import { useSidebarCollapsedGroups } from './hooks/use-sidebar-collapsed-groups';
import { useSidebarExpanded } from './hooks/use-sidebar-expanded';
import { useSidebarToggleShortcut } from './hooks/use-sidebar-toggle-shortcut';
import { SidebarMenu } from './menu/sidebar-menu';

import type {
  SidebarHeaderMode,
  SidebarNavItem,
  SidebarVariant,
} from './sidebar.types';

type SidebarProps = {
  currentPath: string;
  footer?: ReactNode | ((props: { isCollapsed: boolean }) => ReactNode);
  headerMode?: SidebarHeaderMode;
  isDrawer?: boolean;
  items: readonly SidebarNavItem[];
  onBackToDashboard?: () => void;
  onNavigate?: (to: string) => void;
  variant?: SidebarVariant;
};

export function Sidebar({
  currentPath,
  footer,
  headerMode = 'default',
  isDrawer = false,
  items,
  onBackToDashboard,
  onNavigate,
  variant = 'default',
}: SidebarProps) {
  const { isExpanded, isNarrowViewport, toggleExpanded } = useSidebarExpanded();
  const { isGroupCollapsed, toggleGroup } = useSidebarCollapsedGroups();

  const isCompact = variant === 'compact';
  const isFloating = !isDrawer && variant === 'floating';
  const isDocked = !isDrawer && !isFloating;

  // Drawer: always expanded. Compact: stacked icon + label layout, never expanded.
  const showExpanded = isDrawer || (!isCompact && isExpanded);
  const canToggle = !isDrawer && !isCompact && !isNarrowViewport;

  const handleToggleExpanded = () => {
    if (!canToggle) return;
    toggleExpanded();
  };

  useSidebarToggleShortcut(handleToggleExpanded);

  return (
    <aside
      className={cn(
        'group/sidebar relative flex shrink-0 flex-col transition-[width,margin,border-radius,box-shadow] duration-300 ease-in-out motion-reduce:transition-none',
        {
          'bg-surface shadow-surface m-3 h-[calc(100svh-24px)] overflow-visible rounded-2xl border':
            isFloating,
          'size-full': isDrawer,
          'sticky top-0 h-svh border-r border-(--sidebar-edge-outline)':
            isDocked,
          'w-16 min-w-16': !isDrawer && !isCompact && !showExpanded,
          'w-22 min-w-22': !isDrawer && isCompact,
          'w-60 max-w-60': !isDrawer && !isCompact && showExpanded,
        }
      )}
    >
      {canToggle && (
        <SidebarToggleButton
          isExpanded={showExpanded}
          onToggle={handleToggleExpanded}
        />
      )}
      <div
        className={cn('flex h-(--header-height) items-center gap-2 px-4', {
          'justify-center': !showExpanded,
          'justify-start': showExpanded,
        })}
      >
        <SidebarHeader
          headerMode={headerMode}
          isExpanded={showExpanded}
          onBackToDashboard={onBackToDashboard}
        />
      </div>

      <SidebarMenu
        currentPath={currentPath}
        isCompact={isCompact}
        isExpanded={showExpanded}
        isGroupCollapsed={isGroupCollapsed}
        items={items}
        onNavigate={onNavigate}
        onToggleGroup={toggleGroup}
      />

      {footer ? (
        <>
          <Separator />
          <div className='flex h-(--header-height) gap-1 px-4'>
            {typeof footer === 'function'
              ? footer({ isCollapsed: !showExpanded || isCompact })
              : footer}
          </div>
        </>
      ) : null}
    </aside>
  );
}
