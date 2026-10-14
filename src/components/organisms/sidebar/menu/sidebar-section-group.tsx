import type { SidebarNavItem } from '../sidebar.types';
import { SidebarAccordionCollapse } from './sidebar-accordion-collapse';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarSectionHeader } from './sidebar-section-header';

type SidebarSectionGroupProps = {
  childItems: readonly SidebarNavItem[];
  currentPath: string;
  isCompact?: boolean;
  isExpanded: boolean;
  isOpen: boolean;
  label: string;
  onClose: () => void;
  onNavigate?: (to: string) => void;
  onToggle: () => void;
};

export function SidebarSectionGroup({
  childItems,
  currentPath,
  isCompact = false,
  isExpanded,
  isOpen,
  label,
  onClose,
  onNavigate,
  onToggle,
}: SidebarSectionGroupProps) {
  if (isExpanded) {
    return (
      <div>
        <SidebarSectionHeader
          isOpen={isOpen}
          label={label}
          onToggle={onToggle}
        />
        <SidebarAccordionCollapse isOpen={isOpen}>
          <div className='mt-1 space-y-0.5'>
            {childItems.map((child) => (
              <SidebarMenuItem
                currentPath={currentPath}
                isCompact={isCompact}
                isExpanded={isExpanded}
                item={child}
                key={child.to}
                onClose={onClose}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </SidebarAccordionCollapse>
      </div>
    );
  }

  return (
    <div className='mt-1 space-y-0.5'>
      {childItems.map((child) => (
        <SidebarMenuItem
          currentPath={currentPath}
          isCompact={isCompact}
          isExpanded={isExpanded}
          item={child}
          key={child.to}
          onClose={onClose}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
