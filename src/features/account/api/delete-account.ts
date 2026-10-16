import { useMutation } from '@tanstack/react-query';
import { useSessionStorage } from 'usehooks-ts';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { KNOWN_SESSION_STORAGE_KEYS } from '@/config/known-session-storage-keys.constants';
import { authClient } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';

type DeleteAccountInput = {
  password: string;
};

const deleteAccount = async ({ data }: { data: DeleteAccountInput }) => {
  const { error } = await authClient.deleteUser({ password: data.password });

  if (error) {
    throw new Error(error.message || 'Failed to delete account.');
  }
};

type UseDeleteAccountOptions = {
  mutationConfig?: MutationConfig<typeof deleteAccount>;
};

export const useDeleteAccount = ({
  mutationConfig,
}: UseDeleteAccountOptions = {}) => {
  const [, setFlash] = useSessionStorage<boolean | null>(
    KNOWN_SESSION_STORAGE_KEYS.ACCOUNT_DELETED_FLASH,
    null
  );

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      setFlash(true);
      window.location.href = APP_ROUTES.LOGIN;
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteAccount,
  });
};
