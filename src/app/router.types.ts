import type { QueryClient } from '@tanstack/react-query';
import type { authClient } from '@/lib/auth-client';

export type RootRouteContext = {
  auth: ReturnType<typeof authClient.useSession>['data'] | undefined;
  queryClient: QueryClient;
};
