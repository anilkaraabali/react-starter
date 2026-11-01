import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getProductQueryOptions } from '@/api/endpoints/products/get-product';
import { BackButton } from '@/components/atoms/back-button';
import { FormPrimaryActionButton } from '@/components/organisms/form/actions/form-primary-action-button';
import { ContentLayout } from '@/components/templates/content-layout';
import { ProductDetailContent } from '@/features/products/components/product-details/product-detail-content';
import { ProductQueryBoundary } from '@/features/products/components/product-query-boundary';
import { useDynamicHead } from '@/lib/head/head-provider';

function ProductDynamicHead({ name }: { name: string }) {
  useDynamicHead({ title: name });
  return null;
}

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const { t } = useLingui();
  const navigate = useNavigate();

  return (
    <ProductQueryBoundary productId={productId}>
      {(product) => (
        <>
          <ProductDynamicHead name={product.name} />
          <ContentLayout
            actions={
              <>
                <BackButton to='/products'>{t`Back to products`}</BackButton>
                <FormPrimaryActionButton
                  editLabel={t`Edit product`}
                  onEdit={() => {
                    void navigate({
                      params: { productId: product.id },
                      to: '/products/$productId/edit',
                    });
                  }}
                />
              </>
            }
            title={product.name}
          >
            <ProductDetailContent product={product} />
          </ContentLayout>
        </>
      )}
    </ProductQueryBoundary>
  );
}

export const Route = createFileRoute('/_admin/products/$productId/')({
  component: ProductDetailPage,
  loader: ({ context: { queryClient }, params }) => {
    void queryClient.query({
      ...getProductQueryOptions(params.productId),
      staleTime: 'static',
    });
  },
  staticData: { title: msg`Product details` },
});
