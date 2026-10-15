import { useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { QueryState } from '@/components/molecules/query-state';
import { APP_ROUTES } from '@/config/app-routes.constants';
import { useProduct } from '@/features/products/api/get-product';
import type { Product } from '@/features/products/types/product.types';

type ProductQueryBoundaryProps = {
  children: (product: Product) => ReactNode;
  productId: string;
};

export function ProductQueryBoundary({
  children,
  productId,
}: ProductQueryBoundaryProps) {
  const navigate = useNavigate();
  const productQuery = useProduct({ id: productId });

  return (
    <QueryState
      data={productQuery.data}
      isError={productQuery.isError}
      isPending={productQuery.isLoading}
      onBack={() => {
        void navigate({ to: APP_ROUTES.PRODUCTS });
      }}
      onRetry={() => {
        void productQuery.refetch();
      }}
    >
      {children}
    </QueryState>
  );
}
