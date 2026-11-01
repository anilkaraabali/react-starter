export const tablePageSizeOptions = [10, 25, 50, 100] as const;
export type TablePageSize = (typeof tablePageSizeOptions)[number];
