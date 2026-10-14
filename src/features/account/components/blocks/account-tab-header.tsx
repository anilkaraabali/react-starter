import { cn } from '@heroui/react';
import type { ReactNode } from 'react';
import type { AccountBlockProps } from './account-blocks.types';

export const TabHeader = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-tab-header', className)}>{children}</div>
);

export const TabHeaderContent = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-tab-header-content', className)}>{children}</div>
);

export const TabHeaderTitleRow = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-tab-header-title-row', className)}>
    {children}
  </div>
);

export const TabHeaderTitle = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-tab-header-title', className)}>{children}</div>
);

export const TabHeaderDescription = ({
  children,
  className,
}: AccountBlockProps) => (
  <div className={cn('account-tab-header-description', className)}>
    {children}
  </div>
);

type PageHeaderProps = {
  description: ReactNode;
  title: ReactNode;
};

export const PageHeader = ({ description, title }: PageHeaderProps) => (
  <TabHeader>
    <TabHeaderContent>
      <TabHeaderTitleRow>
        <TabHeaderTitle>{title}</TabHeaderTitle>
      </TabHeaderTitleRow>
      <TabHeaderDescription>{description}</TabHeaderDescription>
    </TabHeaderContent>
  </TabHeader>
);
