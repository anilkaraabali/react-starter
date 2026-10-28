import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';

/**
 * Hides items the user may not see. A group loses the children they may not
 * see and disappears when none are left.
 */
export function filterSidebarItems<TPolicy extends string>(
  items: readonly SidebarNavItem<TPolicy>[],
  can: (policy: TPolicy) => boolean
): SidebarNavItem<TPolicy>[] {
  const isAllowed = ({ policy }: { policy?: TPolicy }) =>
    !policy || can(policy);

  return items.flatMap<SidebarNavItem<TPolicy>>((item) => {
    if (!isAllowed(item)) return [];
    if (!item.children) return [item];

    const children = item.children.filter(isAllowed);
    return children.length > 0 ? [{ ...item, children }] : [];
  });
}
