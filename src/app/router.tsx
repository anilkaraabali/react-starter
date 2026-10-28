import { RouterProvider } from '@tanstack/react-router';
import { useAppEvent } from '@/hooks/use-app-event';
import { authClient } from '@/lib/auth-client';
import { Devtools } from './devtools';
import { Loader } from './loader';
import { router } from './router-instance';

export function AppRouter() {
  const { data: session, isPending } = authClient.useSession();

  useAppEvent('auth:unauthorized', () => {
    router.navigate({ to: '/login' });
  });

  // Don't render the router until the session is loaded (the language catalog
  // is already active: `main.tsx` loads it before the app mounts).
  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <RouterProvider
        context={{
          auth: session,
        }}
        router={router}
      />
      <Devtools />
    </>
  );
}
