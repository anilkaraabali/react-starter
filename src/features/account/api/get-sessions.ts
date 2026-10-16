import { queryOptions, useQuery } from '@tanstack/react-query';
import type { AuthSession } from '@/features/account/types/session.types';
import { authClient } from '@/lib/auth-client';
import type { QueryConfig } from '@/lib/react-query';
import { accountKeys } from './account.keys';

const getSessions = async (): Promise<AuthSession[]> => {
  const { data, error } = await authClient.listSessions();
  if (error) {
    throw Object.assign(new Error(error.message || 'Failed to load sessions'), {
      code: error.code,
    });
  }
  return (data ?? []) as AuthSession[];
};

const getSessionsQueryOptions = () => {
  return queryOptions<AuthSession[], Error & { code?: string }>({
    queryFn: getSessions,
    queryKey: accountKeys.sessions(),
  });
};

type UseSessionsOptions = {
  queryConfig?: QueryConfig<typeof getSessionsQueryOptions>;
};

export const useSessions = ({ queryConfig }: UseSessionsOptions = {}) => {
  return useQuery({
    ...getSessionsQueryOptions(),
    ...queryConfig,
  });
};
