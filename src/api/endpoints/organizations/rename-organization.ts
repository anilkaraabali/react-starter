import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationKeys } from '@/api/endpoints/organizations/organizations.keys';
import type { RenameOrganizationInput } from '@/api/models/account/rename-organization-input';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const renameOrganization = ({ data }: { data: RenameOrganizationInput }) => {
  return api.patch('/api/organizations/me', data);
};

type UseRenameOrganizationOptions = {
  mutationConfig?: MutationConfig<typeof renameOrganization>;
};

export const useRenameOrganization = ({
  mutationConfig,
}: UseRenameOrganizationOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.me(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: renameOrganization,
  });
};
