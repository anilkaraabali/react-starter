import { useCallback, useState } from 'react';
import type { SidebarNavItem } from '../sidebar.types';
import { getChildItems } from '../sidebar.utils';

type UseSidebarOpenItemOptions = {
  items: readonly SidebarNavItem[];
};

export function useSidebarOpenItem({ items }: UseSidebarOpenItemOptions) {
  // Store the identifiers of collapsed section items. All sections start expanded.
  const [collapsedKeys, setCollapsedKeys] = useState<Set<string>>(new Set());

  const isItemOpen = useCallback(
    (item: SidebarNavItem) => !collapsedKeys.has(item.to),
    [collapsedKeys]
  );

  const toggleItem = useCallback((item: SidebarNavItem) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(item.to)) {
        next.delete(item.to);
      } else {
        next.add(item.to);
      }
      return next;
    });
  }, []);

  const closeAll = useCallback(() => {
    const allKeys = items
      .filter((item) => getChildItems(item).length > 0)
      .map((item) => item.to);
    setCollapsedKeys(new Set(allKeys));
  }, [items]);

  const openAll = useCallback(() => {
    setCollapsedKeys(new Set());
  }, []);

  return { closeAll, closeItem: closeAll, isItemOpen, openAll, toggleItem };
}
