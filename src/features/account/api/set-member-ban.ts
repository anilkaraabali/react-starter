import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/organization.keys';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

export const setMemberBan = ({
  banned,
  userId,
}: {
  banned: boolean;
  userId: string;
}) => {
  return api.patch(`/api/organizations/members/${userId}/ban`, { banned });
};

type UseSetMemberBanOptions = {
  mutationConfig?: MutationConfig<typeof setMemberBan>;
};

export const useSetMemberBan = ({
  mutationConfig,
}: UseSetMemberBanOptions = {}) => {
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
    mutationFn: setMemberBan,
  });
};
