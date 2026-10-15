import { Chip, type ChipProps } from '@heroui/react';
import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { ProductStatus } from '@/features/products/types/product.types';

const STATUS_CONFIG = {
  active: {
    color: 'success',
    label: msg`Active`,
  },
  archived: {
    color: 'warning',
    label: msg`Archived`,
  },
  draft: {
    color: 'default',
    label: msg`Draft`,
  },
} as const satisfies Record<
  ProductStatus,
  { color: NonNullable<ChipProps['color']>; label: MessageDescriptor }
>;

type ProductStatusChipProps = Omit<ChipProps, 'children'> & {
  status: ProductStatus;
};

export function ProductStatusChip({
  status,
  size = 'sm',
  ...rest
}: ProductStatusChipProps) {
  const { _ } = useLingui();
  const config = STATUS_CONFIG[status];

  return (
    <Chip color={config.color} size={size} variant='soft' {...rest}>
      {_(config.label)}
    </Chip>
  );
}
