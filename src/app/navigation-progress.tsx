import { BProgress } from '@bprogress/core';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

BProgress.configure({ showSpinner: false });

export function NavigationProgress() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribeStart = router.subscribe(
      'onBeforeNavigate',
      ({ fromLocation, pathChanged }) => {
        // Don't show the progress bar on initial page load or search-param-only changes
        if (fromLocation && pathChanged) {
          BProgress.start();
        }
      }
    );
    const unsubscribeDone = router.subscribe('onResolved', () => {
      BProgress.done();
    });

    return () => {
      unsubscribeStart();
      unsubscribeDone();
      BProgress.done();
    };
  }, [router]);

  return null;
}
