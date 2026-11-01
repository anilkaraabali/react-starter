import { queryOptions, useQuery } from '@tanstack/react-query';
import { organizationKeys } from '@/api/endpoints/organizations/organizations.keys';
import type { OrganizationMeDto } from '@/api/models/organizations/organization-me-dto';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

const getOrganizationMe = (signal?: AbortSignal) => {
  return api.get<never, OrganizationMeDto>('/api/organizations/me', {
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
