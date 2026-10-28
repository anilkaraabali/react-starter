import { Tooltip } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { SidebarLeafItem } from '../sidebar.types';
import { SidebarMenuButton } from './sidebar-menu-button';

type SidebarMenuItemProps = {
  isActive: boolean;
  isCompact?: boolean;
  isExpanded: boolean;
  item: SidebarLeafItem;
  onNavigate?: (to: string) => void;
};

export function SidebarMenuItem({
  isActive,
  isCompact = false,
  isExpanded,
  item,
  onNavigate,
}: SidebarMenuItemProps) {
  const { t } = useLingui();

  const button = (
    <SidebarMenuButton
      isActive={isActive}
      isCompact={isCompact}
      isExpanded={isExpanded}
      item={item}
      onPress={() => onNavigate?.(item.to)}
    />
  );

  // Icon-only rail: show the label in a tooltip.
  if (!isExpanded && !isCompact) {
    return (
      <Tooltip delay={0}>
        {button}
        <Tooltip.Content placement='right' showArrow>
          <Tooltip.Arrow />
          {t(item.label)}
        </Tooltip.Content>
      </Tooltip>
    );
  }

  return button;
}
