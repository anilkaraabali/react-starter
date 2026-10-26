import { useSyncExternalStore } from 'react';
import type { TablePageSize } from '@/config/pagination';

const DEFAULT_PAGE_SIZE: TablePageSize = 25;

const HEIGHT_BREAKPOINTS: readonly {
  minHeight: number;
  pageSize: TablePageSize;
}[] = [
  { minHeight: 2000, pageSize: 50 },
  { minHeight: 1200, pageSize: 25 },
];

/** Non-hook variant for route definitions (search defaults, loaders). */
export function getResponsivePageSize(): TablePageSize {
  if (typeof window === 'undefined') return DEFAULT_PAGE_SIZE;
  const height = window.innerHeight;
  return (
    HEIGHT_BREAKPOINTS.find((breakpoint) => height >= breakpoint.minHeight)
      ?.pageSize ?? DEFAULT_PAGE_SIZE
  );
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
}

export function useResponsivePageSize(): TablePageSize {
  return useSyncExternalStore(
    subscribe,
    getResponsivePageSize,
    () => DEFAULT_PAGE_SIZE
  );
}
