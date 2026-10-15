import { buttonVariants } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Filters } from '@/components/organisms/filters/filters';
import { RouteFilterProvider } from '@/components/organisms/filters/stores/route-filter-provider';
import { ContentLayout } from '@/components/templates/content-layout';
import { APP_ROUTES } from '@/config/app-routes.constants';
import {
  type GetProductsQuery,
  useProducts,
} from '@/features/products/api/get-products';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductsTable } from '@/features/products/components/product-list/products-table';
import {
  getProductsFilterFields,
  INITIAL_PRODUCTS_SEARCH_STATE,
} from '@/features/products/config/products-filter.config';
import type { Product } from '@/features/products/types/product.types';
import { useResponsivePageSize } from '@/hooks/use-responsive-page-size';

export function ProductListView() {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as GetProductsQuery;
  const responsivePageSize = useResponsivePageSize();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filterFields = useMemo(() => getProductsFilterFields(), []);

  const page = searchParams.page ?? INITIAL_PRODUCTS_SEARCH_STATE.page ?? 1;
  const pageSize = searchParams.pageSize ?? responsivePageSize;
  const search = searchParams.search ?? '';
  const category = searchParams.category;
  const status = searchParams.status;
  const dateStart = searchParams.dateStart;
  const dateEnd = searchParams.dateEnd;
  const sortBy = searchParams.sortBy ?? INITIAL_PRODUCTS_SEARCH_STATE.sortBy;
  const sortOrder =
    searchParams.sortOrder ?? INITIAL_PRODUCTS_SEARCH_STATE.sortOrder;

  const { data, isLoading } = useProducts({
    params: {
      category,
      dateEnd,
      dateStart,
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      status,
    },
  });

  return (
    <ContentLayout
      actions={
        <Link
          className={buttonVariants({ variant: 'primary' })}
          to={APP_ROUTES.PRODUCT_NEW}
        >
          <PlusIcon />
          {_(msg`Add product`)}
        </Link>
      }
      description={_(
        msg`Manage your catalog, inventory, pricing, and product statuses.`
      )}
    >
      <RouteFilterProvider
        fields={filterFields}
        initialState={INITIAL_PRODUCTS_SEARCH_STATE}
        navigate={navigate}
        search={searchParams}
      >
        <ProductsTable
          isLoading={isLoading}
          onDeleteClick={(product) => setProductToDelete(product)}
          onRowAction={(id) => {
            void navigate({
              params: { productId: id },
              to: APP_ROUTES.PRODUCT_DETAIL,
            });
          }}
          pagination={{
            onPageChange: (newPage) => {
              void navigate({
                search: (prev: unknown) => ({
                  ...(prev as object),
                  page: newPage,
                }),
              } as never);
            },
            onPageSizeChange: (newPageSize) => {
              void navigate({
                search: (prev: unknown) => ({
                  ...(prev as object),
                  page: 1,
                  pageSize: newPageSize,
                }),
              } as never);
            },
            page: data?.meta.page ?? page,
            pageSize: data?.meta.pageSize ?? pageSize,
            total: data?.meta.total ?? 0,
            totalPages: data?.meta.totalPages ?? 1,
          }}
          products={data?.data ?? []}
          toolbar={<Filters />}
        />
      </RouteFilterProvider>

      <DeleteProductModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        product={productToDelete}
      />
    </ContentLayout>
  );
}
