import type { SidebarNavItem } from './sidebar.types';

export function getChildItems(item: SidebarNavItem) {
  return (
    item.sections?.flatMap((section) => section.items) ?? item.children ?? []
  );
}

export function isPathActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}
