export const ProductStatusDto = {
  active: 'active',
  archived: 'archived',
  draft: 'draft',
} as const;

export type ProductStatusDto =
  (typeof ProductStatusDto)[keyof typeof ProductStatusDto];
