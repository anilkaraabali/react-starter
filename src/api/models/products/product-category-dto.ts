export const ProductCategoryDto = {
  accessories: 'accessories',
  books: 'books',
  clothing: 'clothing',
  electronics: 'electronics',
  home: 'home',
} as const;

export type ProductCategoryDto =
  (typeof ProductCategoryDto)[keyof typeof ProductCategoryDto];
