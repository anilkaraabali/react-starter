import { cn } from '@heroui/react';
import type { ReactNode } from 'react';
import type { AccountBlockProps } from './account-blocks.types';

type HeaderProps = AccountBlockProps & {
  titleOnly?: boolean;
};

type HeaderLeadingItemsProps = AccountBlockProps & {
  clickable?: boolean;
};

export const Header = ({ children, className, titleOnly }: HeaderProps) => (
  <div
    className={cn(
      'account-section-header',
      {
        'account-section-header--title-row-only': titleOnly,
      },
      className
    )}
  >
    {children}
  </div>
);

export const HeaderLeadingItems = ({
  children,
  className,
  clickable,
}: HeaderLeadingItemsProps) => (
  <div
    className={cn(
      'account-section-header-leading-items',
      {
        'account-section-header-leading-items-clickable': clickable,
      },
      className
    )}
  >
    {children}
  </div>
);

export const HeaderLabel = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-section-header-label', className)}>
    {children}
  </div>
);

export const HeaderDescription = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-section-header-description', className)}>
    {children}
  </div>
);

export const HeaderTrailingItems = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-section-header-trailing-items', className)}>
    {children}
  </div>
);

type SectionHeaderProps = {
  actions?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
};

export const SectionHeader = ({
  actions,
  description,
  title,
}: SectionHeaderProps) => (
  <Header titleOnly={!description}>
    <HeaderLeadingItems>
      <HeaderLabel>{title}</HeaderLabel>
      {description ? (
        <HeaderDescription>{description}</HeaderDescription>
      ) : null}
    </HeaderLeadingItems>
    {actions ? <HeaderTrailingItems>{actions}</HeaderTrailingItems> : null}
  </Header>
);
