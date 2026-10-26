import { sidebarVariants } from '@/config/layout-options';
import type { SidebarVariant } from '@/types/layout.types';

export function isSidebarVariant(value: unknown): value is SidebarVariant {
  return (
    typeof value === 'string' &&
    (sidebarVariants as readonly string[]).includes(value)
  );
}
