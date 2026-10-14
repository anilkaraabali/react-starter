export const accountKeys = {
  all: ['account'] as const,
  sessions: () => [...accountKeys.all, 'sessions'] as const,
};
