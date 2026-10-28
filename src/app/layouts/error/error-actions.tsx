import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useRouter } from '@tanstack/react-router';

import { signOut } from '@/lib/auth-client';

export function ErrorActions() {
  const { t } = useLingui();
  const router = useRouter();
  const navigate = useNavigate();
  const isHomePage = router.state.location.pathname === '/';

  // The target may be the page that failed; `invalidate` re-runs
  // `beforeLoad`/loaders and resets the route error boundary either way.
  const handleGoBack = async () => {
    await navigate({ to: '/dashboard' });
    await router.invalidate();
  };

  const handleLogout = async () => {
    await signOut();
    navigate({ to: '/login' });
  };

  return (
    <>
      {!isHomePage && (
        <Button onPress={handleGoBack}>{t`Go back to dashboard`}</Button>
      )}
      <Button onPress={handleLogout} variant='ghost'>
        {t`Log out`}
      </Button>
    </>
  );
}
