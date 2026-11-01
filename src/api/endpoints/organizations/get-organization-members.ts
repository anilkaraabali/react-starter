import { queryOptions, useQuery } from '@tanstack/react-query';
import { organizationKeys } from '@/api/endpoints/organizations/organizations.keys';
import type { OrganizationMembersDto } from '@/api/models/organizations/organization-members-dto';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

const getOrganizationMembers = (signal?: AbortSignal) => {
  return api.get<never, OrganizationMembersDto>('/api/organizations/members', {
    signal,
  });
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
