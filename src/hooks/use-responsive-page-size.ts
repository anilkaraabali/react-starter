import { useSyncExternalStore } from 'react';
import type { TablePageSize } from '@/config/pagination.constants';

const DEFAULT_PAGE_SIZE: TablePageSize = 25;

const HEIGHT_BREAKPOINTS: readonly {
  minHeight: number;
  pageSize: TablePageSize;
}[] = [
  { minHeight: 2000, pageSize: 50 },
  { minHeight: 1200, pageSize: 25 },
];

function getSnapshot(): TablePageSize {
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
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PAGE_SIZE);
}
