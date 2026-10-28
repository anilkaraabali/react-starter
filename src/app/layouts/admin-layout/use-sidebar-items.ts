import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useAuthorization } from '@/lib/authorization/use-authorization';
import { filterSidebarItems } from './filter-sidebar-items';
import { SIDEBAR_ITEMS } from './sidebar-items';

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
