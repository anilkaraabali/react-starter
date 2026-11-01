import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/endpoints/organizations/organizations.keys';
import type { OrganizationMemberRoleDto } from '@/api/models/organizations/organization-member-role-dto';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const updateMemberRole = ({
  data,
  memberId,
}: {
  data: { role: OrganizationMemberRoleDto };
  memberId: string;
}) => {
  return api.patch(`/api/organizations/members/${memberId}/role`, data);
};

type UseUpdateMemberRoleOptions = {
  mutationConfig?: MutationConfig<typeof updateMemberRole>;
};

export const useUpdateMemberRole = ({
  mutationConfig,
}: UseUpdateMemberRoleOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateMemberRole,
  });
};
