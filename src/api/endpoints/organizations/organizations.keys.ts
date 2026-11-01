export const organizationKeys = {
  all: ['organizations'] as const,
  me: () => [...organizationKeys.all, 'me'] as const,
  members: () => [...organizationKeys.all, 'members'] as const,
};
