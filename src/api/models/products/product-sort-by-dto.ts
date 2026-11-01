export const ProductSortByDto = {
  category: 'category',
  createdAt: 'createdAt',
  name: 'name',
  price: 'price',
  status: 'status',
  stock: 'stock',
  updatedAt: 'updatedAt',
} as const;

export type ProductSortByDto =
  (typeof ProductSortByDto)[keyof typeof ProductSortByDto];
