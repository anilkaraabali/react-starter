import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { getProductQueryOptions } from '@/api/endpoints/products/get-product';
import { BackButton } from '@/components/atoms/back-button';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { ContentLayout } from '@/components/templates/content-layout';
import { DeleteProductModal } from '@/features/products/components/delete-product-modal';
import { EditProduct } from '@/features/products/components/forms/edit-product';
import { ProductQueryBoundary } from '@/features/products/components/product-query-boundary';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Edit product`),
  },
];

function ProductEditPage() {
  const { productId } = Route.useParams();
  const { t } = useLingui();
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <ProductQueryBoundary productId={productId}>
      {(product) => (
        <>
          <ContentLayout
            actions={
              <>
                <BackButton to='/products'>{t`Back to products`}</BackButton>
                <FormActions
                  deleteLabel={t`Delete product`}
                  onDelete={() => setIsDeleteOpen(true)}
                />
              </>
            }
            description={product.name}
          >
            <EditProduct product={product} productId={productId} />
          </ContentLayout>
          <DeleteProductModal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onSuccess={() => {
              void navigate({ to: '/products' });
            }}
            product={product}
          />
        </>
      )}
    </ProductQueryBoundary>
  );
}

export const Route = createFileRoute('/_admin/products/$productId/edit')({
  component: ProductEditPage,
  loader: ({ context: { queryClient }, params }) => {
    void queryClient.query({
      ...getProductQueryOptions(params.productId),
      staleTime: 'static',
    });
    return { meta };
  },
});
