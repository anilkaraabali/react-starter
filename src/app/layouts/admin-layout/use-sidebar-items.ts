import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';
import { useAuthorization } from '@/lib/authorization/use-authorization';
import { SIDEBAR_ITEMS } from './sidebar-items';

function filterSidebarItems<TPolicy extends string>(
  items: readonly SidebarNavItem<TPolicy>[],
  can: (policy: TPolicy) => boolean
): SidebarNavItem<TPolicy>[] {
  const result: SidebarNavItem<TPolicy>[] = [];

  for (const item of items) {
    if (item.policy && !can(item.policy)) continue;

    if (item.children) {
      const children = filterSidebarItems(item.children, can);
      if (children.length > 0) {
        result.push({ ...item, children });
      }
    } else if (item.sections) {
      const sections = item.sections
        .map((section) => ({
          ...section,
          items: filterSidebarItems(section.items, can),
        }))
        .filter((section) => section.items.length > 0);
      if (sections.length > 0) {
        result.push({ ...item, sections });
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

export function useSidebarItems() {
  const { can } = useAuthorization();
  const headerMode = useRouterState({
    select: (state) =>
      state.matches.findLast((match) => match.staticData.sidebarHeaderMode)
        ?.staticData.sidebarHeaderMode ?? 'default',
  });
  const sidebarItems = useRouterState({
    select: (state) =>
      state.matches.findLast((match) => match.staticData.sidebarItems)
        ?.staticData.sidebarItems ?? SIDEBAR_ITEMS,
  });

  const items = useMemo(
    () =>
      filterSidebarItems(sidebarItems, (policy) =>
        can(policy as Parameters<typeof can>[0])
      ),
    [sidebarItems, can]
  );

  return { headerMode, items };
}
