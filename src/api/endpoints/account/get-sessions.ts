import { queryOptions, useQuery } from '@tanstack/react-query';
import { accountKeys } from '@/api/endpoints/account/account.keys';
import type { AuthSessionDto } from '@/api/models/account/auth-session-dto';
import { authClient } from '@/lib/auth-client';
import type { QueryConfig } from '@/lib/react-query';

const getSessions = async (): Promise<AuthSessionDto[]> => {
  const { data, error } = await authClient.listSessions();
  if (error) {
    throw Object.assign(new Error(error.message || 'Failed to load sessions'), {
      code: error.code,
    });
  }
  return (data ?? []) as AuthSessionDto[];
};

export const getSessionsQueryOptions = () => {
  return queryOptions<AuthSessionDto[], Error & { code?: string }>({
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
