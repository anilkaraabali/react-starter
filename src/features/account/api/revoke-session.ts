import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { authClient, signOut } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';
import { accountKeys } from './account.keys';

export type RevokeSessionInput = {
  isCurrent: boolean;
  token: string;
};

export const revokeSession = async ({ data }: { data: RevokeSessionInput }) => {
  const { error } = await authClient.revokeSession({ token: data.token });

  if (error) {
    throw new Error(error.message || 'Failed to revoke session.');
  }
};

type UseRevokeSessionOptions = {
  mutationConfig?: MutationConfig<typeof revokeSession>;
};

export const useRevokeSession = ({
  mutationConfig,
}: UseRevokeSessionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      if (args[1].data.isCurrent) {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = APP_ROUTES.LOGIN;
            },
          },
        });
      } else {
        queryClient.invalidateQueries({ queryKey: accountKeys.sessions() });
      }

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: revokeSession,
  });
};
