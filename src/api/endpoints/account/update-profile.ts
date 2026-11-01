import { useMutation } from '@tanstack/react-query';
import type { UpdateProfileInput } from '@/api/models/account/update-profile-input';
import { api } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';
import type { MutationConfig } from '@/lib/react-query';

const updateProfile = async ({ data }: { data: UpdateProfileInput }) => {
  const response = await api.patch('/api/account/profile', data);
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
