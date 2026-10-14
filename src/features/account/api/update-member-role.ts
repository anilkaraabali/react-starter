import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/organization.keys';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import type { OrganizationMemberRole } from '@/types/organization.types';

export const updateMemberRole = ({
  data,
  memberId,
}: {
  data: { role: OrganizationMemberRole };
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
