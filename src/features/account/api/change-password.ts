import { useMutation } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
};

export const changePassword = async ({
  data,
}: {
  data: ChangePasswordInput;
}) => {
  const { error } = await authClient.changePassword({
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    revokeOtherSessions: data.revokeOtherSessions ?? false,
  });

  if (error) {
    throw new Error(error.message || 'Failed to update password.');
  }
};

type UseChangePasswordOptions = {
  mutationConfig?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({
  mutationConfig,
}: UseChangePasswordOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: changePassword,
  });
};
