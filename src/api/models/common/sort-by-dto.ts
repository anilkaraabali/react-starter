export const SortByDto = {
  createdAt: 'createdAt',
  name: 'name',
  updatedAt: 'updatedAt',
} as const;

export type SortByDto = (typeof SortByDto)[keyof typeof SortByDto];
