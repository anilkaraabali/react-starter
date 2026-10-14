import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const result = window.matchMedia(query);

      result.addEventListener('change', onStoreChange);

      return () => result.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
