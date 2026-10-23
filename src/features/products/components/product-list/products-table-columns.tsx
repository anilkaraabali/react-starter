import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { Link } from '@tanstack/react-router';
import { EyeIcon, PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { TableColumnDef } from '@/components/organisms/data-table/data-table.types';
import { TableAction } from '@/components/organisms/data-table/table-action';
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
          <TableAction.Link
            label={i18n._(msg`View details`)}
            params={{ productId: p.id }}
            to='/products/$productId'
          >
            <EyeIcon />
          </TableAction.Link>
          <TableAction.Link
            label={i18n._(msg`Edit product`)}
            params={{ productId: p.id }}
            to='/products/$productId/edit'
          >
            <PencilLineIcon />
          </TableAction.Link>
          <TableAction.Button
            label={i18n._(msg`Delete product`)}
            onPress={() => onDeleteClick(p)}
            variant='danger-soft'
          >
            <Trash2Icon className='text-danger' />
          </TableAction.Button>
        </div>
      ),
      header: () => '',
      hideable: true,
      id: 'actions',
      label: () => i18n._(msg`Actions`),
    },
  ] as const satisfies readonly TableColumnDef<Product>[];
