import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/organization.keys';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

export const removeMember = ({ memberId }: { memberId: string }) => {
  return api.delete(`/api/organizations/members/${memberId}`);
};

type UseRemoveMemberOptions = {
  mutationConfig?: MutationConfig<typeof removeMember>;
};

export const useRemoveMember = ({
  mutationConfig,
}: UseRemoveMemberOptions = {}) => {
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
    mutationFn: removeMember,
  });
};
