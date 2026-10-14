import type { SidebarHeaderMode } from '../sidebar.types';
import { SidebarBackButton } from './sidebar-back-button';
import { SidebarLogoLink } from './sidebar-logo-link';

type SidebarHeaderProps = {
  headerMode?: SidebarHeaderMode;
  isExpanded: boolean;
  onBackToDashboard?: () => void;
};

export function SidebarHeader({
  headerMode = 'default',
  isExpanded,
  onBackToDashboard = () => {},
}: SidebarHeaderProps) {
  if (headerMode === 'account') {
    return (
      <SidebarBackButton isExpanded={isExpanded} onPress={onBackToDashboard} />
    );
  }

  return <SidebarLogoLink isExpanded={isExpanded} />;
}
