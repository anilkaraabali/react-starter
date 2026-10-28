import { cn, ScrollShadow } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { SidebarNavItem } from '../sidebar.types';
import { findActiveTo } from '../sidebar.utils';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarSectionGroup } from './sidebar-section-group';

type SidebarMenuProps = {
  currentPath: string;
  isCompact?: boolean;
  isExpanded: boolean;
  isGroupCollapsed: (key: string) => boolean;
  items: readonly SidebarNavItem[];
  onNavigate?: (to: string) => void;
  onToggleGroup: (key: string) => void;
};

export function SidebarMenu({
  currentPath,
  isCompact = false,
  isExpanded,
  isGroupCollapsed,
  items,
  onNavigate,
  onToggleGroup,
}: SidebarMenuProps) {
  const { t } = useLingui();
  const activeTo = findActiveTo(items, currentPath);

  return (
    <ScrollShadow className={cn('min-h-0 flex-1 px-3 py-4')}>
      <nav aria-label={t`Main navigation`} className='flex flex-col gap-0.5'>
        {items.map((item) => {
          if (!item.children) {
            return (
              <SidebarMenuItem
                isActive={item.to === activeTo}
                isCompact={isCompact}
                isExpanded={isExpanded}
                item={item}
                key={item.to}
                onNavigate={onNavigate}
              />
            );
          }

          const childItems = item.children;
          const groupId = item.label.id;

          return (
            <div
              className={cn(
                'my-1.5',
                !isExpanded && 'not-first:border-t not-first:pt-2'
              )}
              key={groupId}
            >
              <SidebarSectionGroup
                activeTo={activeTo}
                childItems={childItems}
                isCompact={isCompact}
                isExpanded={isExpanded}
                isOpen={!isGroupCollapsed(groupId)}
                label={t(item.label)}
                onNavigate={onNavigate}
                onToggle={() => onToggleGroup(groupId)}
              />
            </div>
          );
        })}
      </nav>
    </ScrollShadow>
  );
}
