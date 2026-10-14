export const TABLE_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export type TablePageSize = (typeof TABLE_PAGE_SIZE_OPTIONS)[number];
