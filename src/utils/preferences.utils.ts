import { SIDEBAR_VARIANTS } from '@/config/preferences.constants';
import type { SidebarVariant } from '@/types/layout.types';

export function isSidebarVariant(value: unknown): value is SidebarVariant {
  return (
    typeof value === 'string' &&
    (SIDEBAR_VARIANTS as readonly string[]).includes(value)
  );
}
