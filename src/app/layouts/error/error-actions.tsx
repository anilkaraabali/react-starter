import { Button } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate, useRouter } from '@tanstack/react-router';

import { APP_ROUTES } from '@/config/app-routes.constants';
import { signOut } from '@/lib/auth-client';

export function ErrorActions() {
  const { _ } = useLingui();
  const router = useRouter();
  const navigate = useNavigate();
  const isHomePage = router.state.location.pathname === '/';

  // The target may be the page that failed; `invalidate` re-runs
  // `beforeLoad`/loaders and resets the route error boundary either way.
  const handleGoBack = async () => {
    await navigate({ to: APP_ROUTES.DASHBOARD });
    await router.invalidate();
  };

  const handleLogout = async () => {
    await signOut();
    navigate({ to: APP_ROUTES.LOGIN });
  };

  return (
    <>
      {!isHomePage && (
        <Button onPress={handleGoBack}>{_(msg`Go back to dashboard`)}</Button>
      )}
      <Button onPress={handleLogout} variant='ghost'>
        {_(msg`Log out`)}
      </Button>
    </>
  );
}
