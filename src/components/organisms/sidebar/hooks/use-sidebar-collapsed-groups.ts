import { useCallback, useState } from 'react';

/**
 * Tracks which sidebar groups the user collapsed. Every group is open by
 * default and only a click changes that; the state is not persisted, so a
 * reload opens every group again.
 */
export function useSidebarCollapsedGroups() {
  const [collapsedKeys, setCollapsedKeys] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  const isGroupCollapsed = useCallback(
    (key: string) => collapsedKeys.has(key),
    [collapsedKeys]
  );

  const toggleGroup = useCallback((key: string) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      if (!next.delete(key)) next.add(key);
      return next;
    });
  }, []);

  return { isGroupCollapsed, toggleGroup };
}
