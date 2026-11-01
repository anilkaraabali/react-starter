type Meta = {
  page: number;
  pageSize?: number;
  total: number;
  totalPages: number;
};

export type Collection<T> = {
  data: T[];
  meta: Meta;
};
