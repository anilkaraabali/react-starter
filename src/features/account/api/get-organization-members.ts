import { queryOptions, useQuery } from '@tanstack/react-query';
import { organizationKeys } from '@/api/organization.keys';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import type { OrganizationMembersResponseDto } from '@/types/organization.types';

export const getOrganizationMembers = (signal?: AbortSignal) => {
  return api.get<never, OrganizationMembersResponseDto>(
    '/api/organizations/members',
    { signal }
  );
};

export const getOrganizationMembersQueryOptions = () =>
  queryOptions({
    queryFn: ({ signal }) => getOrganizationMembers(signal),
    queryKey: organizationKeys.members(),
  });

type UseOrganizationMembersOptions = {
  queryConfig?: QueryConfig<typeof getOrganizationMembersQueryOptions>;
};

export const useOrganizationMembers = ({
  queryConfig,
}: UseOrganizationMembersOptions = {}) => {
  return useQuery({
    ...getOrganizationMembersQueryOptions(),
    ...queryConfig,
  });
};
