import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import type { OrganizationMeResponseDto } from '@/types/organization.types';
import { organizationKeys } from './organization.keys';

export const getOrganizationMe = (signal?: AbortSignal) => {
  return api.get<never, OrganizationMeResponseDto>('/api/organizations/me', {
    signal,
  });
};

export const getOrganizationMeQueryOptions = () =>
  queryOptions({
    queryFn: ({ signal }) => getOrganizationMe(signal),
    queryKey: organizationKeys.me(),
  });

type UseOrganizationMeOptions = {
  queryConfig?: QueryConfig<typeof getOrganizationMeQueryOptions>;
};

export const useOrganizationMe = ({
  queryConfig,
}: UseOrganizationMeOptions = {}) => {
  return useQuery({
    ...getOrganizationMeQueryOptions(),
    ...queryConfig,
  });
};
