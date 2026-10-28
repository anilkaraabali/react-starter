import type { SidebarNavItem } from './sidebar.types';

function isPathActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

/**
 * Route of the single link that matches the current path best. Group parents
 * only toggle, so only links count, and the longest match wins so `/product`
 * is not highlighted on `/product/definitions`.
 */
export function findActiveTo(
  items: readonly SidebarNavItem[],
  pathname: string
): string | undefined {
  let activeTo: string | undefined;

  for (const item of items) {
    for (const link of item.children ?? [item]) {
      if (
        isPathActive(pathname, link.to) &&
        link.to.length > (activeTo?.length ?? -1)
      ) {
        activeTo = link.to;
      }
    }
  }

  return activeTo;
}
