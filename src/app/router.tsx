import { RouterProvider } from '@tanstack/react-router';
import { useAppEvent } from '@/hooks/use-app-event';
import { authClient } from '@/lib/auth-client';
import { Devtools } from './devtools';
import { Loader } from './loader';
import { router } from './router-instance';

type AppRouterProps = {
  isLanguageLoaded: boolean;
};

export function AppRouter({ isLanguageLoaded }: AppRouterProps) {
  const { data: session, isPending } = authClient.useSession();

  useAppEvent('auth:unauthorized', () => {
    router.navigate({ to: '/login' });
  });

  // Don't render router until both language catalog and session are loaded
  if (isPending || !isLanguageLoaded) {
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
