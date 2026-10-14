import { cn } from '@heroui/react';
import type { ReactNode } from 'react';
import {
  List,
  SubSection,
  SubSectionList,
} from '@/features/account/components/blocks/account-section';
import type { AccountBlockProps } from './account-blocks.types';

export const Cell = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-cell', className)}>{children}</div>
);

export const CellLeadingItems = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-cell-leading-items', className)}>{children}</div>
);

export const CellContent = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-cell-content', className)}>{children}</div>
);

export const CellLabel = ({ children, className }: AccountBlockProps) => (
  <p className={cn('account-cell-label', className)}>{children}</p>
);

export const CellDescription = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-cell-description', className)}>{children}</div>
);

export const CellTrailingItems = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-cell-trailing-items', className)}>{children}</div>
);

export const CellList = ({ children, className }: AccountBlockProps) => (
  <List className={className}>
    <SubSection>
      <SubSectionList>{children}</SubSectionList>
    </SubSection>
  </List>
);

type RowProps = {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  label: ReactNode;
  trailingClassName?: string;
};

export const Row = ({
  children,
  className,
  description,
  label,
  trailingClassName,
}: RowProps) => (
  <Cell className={className}>
    <CellLeadingItems>
      <CellContent>
        <CellLabel>{label}</CellLabel>
        {description ? <CellDescription>{description}</CellDescription> : null}
      </CellContent>
    </CellLeadingItems>
    {children ? (
      <CellTrailingItems className={trailingClassName}>
        {children}
      </CellTrailingItems>
    ) : null}
  </Cell>
);
