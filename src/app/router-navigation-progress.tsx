import { useRouterState } from '@tanstack/react-router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

const SHOW_DELAY_MS = 0;

NProgress.configure({ showSpinner: false });

export function RouterNavigationProgress() {
  const isNavigating = useRouterState({
    select: (state) => state.isLoading || state.status === 'pending',
  });

  useEffect(() => {
    if (!isNavigating) {
      return;
    }

    const timeout = setTimeout(() => NProgress.start(), SHOW_DELAY_MS);

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [isNavigating]);

  return null;
}
