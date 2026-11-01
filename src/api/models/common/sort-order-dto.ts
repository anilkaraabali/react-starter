export const SortOrderDto = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortOrderDto = (typeof SortOrderDto)[keyof typeof SortOrderDto];
