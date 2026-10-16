import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';
import { accountKeys } from './account.keys';

const revokeOtherSessions = async () => {
  const { error } = await authClient.revokeOtherSessions();

  if (error) {
    throw new Error(error.message || 'Failed to revoke sessions.');
  }
};

type UseRevokeOtherSessionsOptions = {
  mutationConfig?: MutationConfig<typeof revokeOtherSessions>;
};

export const useRevokeOtherSessions = ({
  mutationConfig,
}: UseRevokeOtherSessionsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.sessions() });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: revokeOtherSessions,
  });
};
