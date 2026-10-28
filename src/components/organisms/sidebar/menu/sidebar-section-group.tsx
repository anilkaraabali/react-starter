import { useId } from 'react';
import type { SidebarLeafItem } from '../sidebar.types';
import { SidebarAccordionCollapse } from './sidebar-accordion-collapse';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarSectionHeader } from './sidebar-section-header';

type SidebarSectionGroupProps = {
  activeTo?: string;
  childItems: readonly SidebarLeafItem[];
  isCompact?: boolean;
  isExpanded: boolean;
  isOpen: boolean;
  /** The group holds the active route, so it stays open. */
  label: string;
  onNavigate?: (to: string) => void;
  onToggle: () => void;
};

export function SidebarSectionGroup({
  activeTo,
  childItems,
  isCompact = false,
  isExpanded,
  isOpen,
  label,
  onNavigate,
  onToggle,
}: SidebarSectionGroupProps) {
  const contentId = useId();

  const renderItems = () =>
    childItems.map((child) => (
      <SidebarMenuItem
        isActive={child.to === activeTo}
        isCompact={isCompact}
        isExpanded={isExpanded}
        item={child}
        key={child.to}
        onNavigate={onNavigate}
      />
    ));

  // Icon-only rail: no labels and no collapsing, groups are split by a hairline.
  if (!isExpanded) {
    return <div className='space-y-0.5'>{renderItems()}</div>;
  }

  return (
    <div>
      <SidebarSectionHeader
        contentId={contentId}
        isOpen={isOpen}
        label={label}
        onToggle={onToggle}
      />
      <SidebarAccordionCollapse id={contentId} isOpen={isOpen}>
        <div className='mt-1 space-y-0.5'>{renderItems()}</div>
      </SidebarAccordionCollapse>
    </div>
  );
}
