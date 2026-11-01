type BaseEntity = {
  createdAt: string;
  id: string;
  updatedAt: string;
  version: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;
