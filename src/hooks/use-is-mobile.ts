import { useSyncExternalStore } from 'react';

export function useIsMobile(mobileBreakpoint = 640) {
  const isMobile = useSyncExternalStore(
    (callback) => subscribe(mobileBreakpoint, callback),
    () => window.innerWidth < mobileBreakpoint,
    () => false
  );

  return isMobile;
}

function subscribe(mobileBreakpoint: number, callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);

  mql.addEventListener('change', callback);

  return () => mql.removeEventListener('change', callback);
}
