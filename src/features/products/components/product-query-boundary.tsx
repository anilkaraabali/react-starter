import { useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useProduct } from '@/api/endpoints/products/get-product';
import type { ProductDto } from '@/api/models/products/product-dto';
import { QueryState } from '@/components/molecules/query-state';

type ProductQueryBoundaryProps = {
  children: (product: ProductDto) => ReactNode;
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
        void navigate({ to: '/products' });
      }}
      onRetry={() => {
        void productQuery.refetch();
      }}
    >
      {children}
    </QueryState>
  );
}
