import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { useMediaQuery } from '@/hooks/use-media-query';

export function useSidebarExpanded() {
  const isNarrowViewport = useMediaQuery('(max-width: 1023px)');
  const [isExpanded, setIsExpanded] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SIDEBAR_EXPANDED,
    true
  );

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  return {
    isExpanded: isExpanded && !isNarrowViewport,
    isNarrowViewport,
    toggleExpanded,
  };
}
