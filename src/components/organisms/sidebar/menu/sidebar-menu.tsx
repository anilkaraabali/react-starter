import { cn, ScrollShadow } from '@heroui/react';
import { useLingui } from '@lingui/react';
import type { SidebarNavItem } from '../sidebar.types';
import { getChildItems } from '../sidebar.utils';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarSectionGroup } from './sidebar-section-group';

type SidebarMenuProps = {
  currentPath: string;
  isCompact?: boolean;
  isExpanded: boolean;
  isItemOpen: (item: SidebarNavItem) => boolean;
  items: readonly SidebarNavItem[];
  onCloseItem: () => void;
  onNavigate?: (to: string) => void;
  onToggleItem: (item: SidebarNavItem) => void;
};

export function SidebarMenu({
  currentPath,
  isCompact = false,
  isExpanded,
  isItemOpen,
  items,
  onCloseItem,
  onNavigate,
  onToggleItem,
}: SidebarMenuProps) {
  const { _ } = useLingui();
  const standaloneItems = items;
  const sectionItems = items.filter((item) =>
    Boolean(item.children?.length || item.sections?.length)
  );

  return (
    <ScrollShadow className={cn('min-h-0 flex-1 px-3 py-4')}>
      <div className='space-y-3'>
        <div className='mt-1 space-y-0.5'>
          {standaloneItems.map((item) => (
            <SidebarMenuItem
              currentPath={currentPath}
              isCompact={isCompact}
              isExpanded={isExpanded}
              item={item}
              key={item.to}
              onClose={onCloseItem}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {sectionItems.length > 0 && (
          <div className='space-y-3'>
            {sectionItems.map((item) => (
              <SidebarSectionGroup
                childItems={getChildItems(item)}
                currentPath={currentPath}
                isCompact={isCompact}
                isExpanded={isExpanded}
                isOpen={isItemOpen(item)}
                key={item.to}
                label={_(item.label)}
                onClose={onCloseItem}
                onNavigate={onNavigate}
                onToggle={() => onToggleItem(item)}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollShadow>
  );
}
