import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { KNOWN_LOCAL_STORAGE_KEYS } from '@/config/known-local-storage-keys.constants';
import { useMediaQuery } from '@/hooks/use-media-query';

export function useSidebarExpanded() {
  const isNarrowViewport = useMediaQuery('(max-width: 1023px)');
  const [isExpanded, setIsExpanded] = useLocalStorage(
    KNOWN_LOCAL_STORAGE_KEYS.SIDEBAR_EXPANDED,
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
