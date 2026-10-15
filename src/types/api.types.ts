type BaseEntity = {
  createdAt: string;
  id: string;
  updatedAt: string;
  version: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

type Meta = {
  page: number;
  pageSize?: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: Meta;
};
