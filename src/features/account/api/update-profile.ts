import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';
import type { AccountProfileUpdateDto } from '@/types/organization.types';

const updateProfile = async ({ data }: { data: AccountProfileUpdateDto }) => {
  const response = await api.patch('/api/account/profile', data);
  // Bypass cookie cache (stale user fields) and update the useSession atom.
  await authClient.$store.atoms.session.get().refetch({
    query: {
      disableCookieCache: true,
    },
  });
  return response;
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
