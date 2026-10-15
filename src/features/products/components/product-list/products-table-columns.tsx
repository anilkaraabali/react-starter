import { Button, buttonVariants } from '@heroui/react';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { Link } from '@tanstack/react-router';
import { EyeIcon, PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { TableColumnDef } from '@/components/organisms/data-table/data-table.types';
import { ProductStatusChip } from '@/features/products/components/product-status-chip';
import type { Product } from '@/features/products/types/product.types';
import { formatCurrency } from '@/utils/format.utils';

type CreateProductsTableColumnsOptions = {
  onDeleteClick: (product: Product) => void;
};

/**
 * Creates the columns definition for the products table.
 * The column list acts as the single source of truth for IDs.
 */
export const createProductsTableColumns = ({
  onDeleteClick,
}: CreateProductsTableColumnsOptions) =>
  [
    {
      cell: (p: Product) => (
        <div>
          <Link
            className='hover:underline'
            params={{ productId: p.id }}
            to='/products/$productId'
          >
            {p.name}
          </Link>
          <div className='text-muted text-xs'>{p.sku}</div>
        </div>
      ),
      header: () => i18n._(msg`Product`),
      id: 'name',
      isRowHeader: true,
    },
    {
      cell: (p: Product) => <span className='capitalize'>{p.category}</span>,
      header: () => i18n._(msg`Category`),
      id: 'category',
    },
    {
      cell: (p: Product) => formatCurrency(p.price),
      header: () => i18n._(msg`Price`),
      id: 'price',
    },
    {
      cell: (p: Product) => p.stock,
      header: () => i18n._(msg`Stock`),
      id: 'stock',
    },
    {
      cell: (p: Product) => <ProductStatusChip status={p.status} />,
      header: () => i18n._(msg`Status`),
      id: 'status',
    },
    {
      cell: (p: Product) => (
        <div className='flex items-center justify-end gap-1'>
          <Link
            aria-label={i18n._(msg`View details`)}
            className={buttonVariants({
              isIconOnly: true,
              size: 'sm',
              variant: 'tertiary',
            })}
            params={{ productId: p.id }}
            to='/products/$productId'
          >
            <EyeIcon />
          </Link>
          <Link
            aria-label={i18n._(msg`Edit product`)}
            className={buttonVariants({
              isIconOnly: true,
              size: 'sm',
              variant: 'tertiary',
            })}
            params={{ productId: p.id }}
            to='/products/$productId/edit'
          >
            <PencilLineIcon />
          </Link>
          <Button
            aria-label={i18n._(msg`Delete product`)}
            isIconOnly
            onPress={() => onDeleteClick(p)}
            size='sm'
            variant='danger-soft'
          >
            <Trash2Icon className='text-danger' />
          </Button>
        </div>
      ),
      header: () => '',
      hideable: true,
      id: 'actions',
      label: () => i18n._(msg`Actions`),
    },
  ] as const satisfies readonly TableColumnDef<Product>[];
