import { msg } from '@lingui/core/macro';
import { Link } from '@tanstack/react-router';
import { EyeIcon, PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { ProductDto } from '@/api/models/products/product-dto';
import type { TableColumnDef } from '@/components/organisms/data-table/data-table.types';
import { TableAction } from '@/components/organisms/data-table/table-action';
import { ProductStatusChip } from '@/features/products/components/product-status-chip';
import type { Translate } from '@/types/i18n.types';
import { formatCurrency } from '@/utils/format.utils';

export type ProductTableRow = ProductDto;

export function createProductsTableColumns(
  t: Translate,
  onDeleteClick: (product: ProductDto) => void
): readonly TableColumnDef<ProductTableRow>[] {
  return [
    {
      cell: (p) => (
        <Link
          className='hover:underline'
          params={{ productId: p.id }}
          to='/products/$productId'
        >
          {p.name}
        </Link>
      ),
      header: () => t(msg`Name`),
      id: 'name',
      isRowHeader: true,
    },
    {
      cell: (p) => p.sku,
      header: () => t(msg`SKU`),
      id: 'sku',
    },
    {
      cell: (p) => <span className='capitalize'>{p.category}</span>,
      header: () => t(msg`Category`),
      id: 'category',
    },
    {
      cell: (p) => formatCurrency(p.price),
      header: () => t(msg`Price`),
      id: 'price',
    },
    {
      cell: (p) => p.stock,
      header: () => t(msg`Stock`),
      id: 'stock',
    },
    {
      cell: (p) => <ProductStatusChip status={p.status} />,
      header: () => t(msg`Status`),
      id: 'status',
    },
    {
      cell: (p) => (
        <div className='flex items-center justify-end gap-1'>
          <TableAction.Link
            label={t(msg`View details`)}
            params={{ productId: p.id }}
            to='/products/$productId'
          >
            <EyeIcon />
          </TableAction.Link>
          <TableAction.Link
            label={t(msg`Edit product`)}
            params={{ productId: p.id }}
            to='/products/$productId/edit'
          >
            <PencilLineIcon />
          </TableAction.Link>
          <TableAction.Button
            label={t(msg`Delete product`)}
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
      label: () => t(msg`Actions`),
    },
  ];
}
