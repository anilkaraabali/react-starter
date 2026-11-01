import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/endpoints/organizations/organizations.keys';
import type { CreateMemberInput } from '@/api/models/account/create-member-input';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const createMember = ({ data }: { data: CreateMemberInput }) => {
  return api.post('/api/organizations/members', data);
};

type UseCreateMemberOptions = {
  mutationConfig?: MutationConfig<typeof createMember>;
};

export const useCreateMember = ({
  mutationConfig,
}: UseCreateMemberOptions = {}) => {
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
    mutationFn: createMember,
  });
};
