import { cn } from '@heroui/react';
import type { ReactNode } from 'react';
import {
  PageHeader,
  type PageHeaderProps,
} from '@/components/molecules/page-header';

export type ContentLayoutProps = PageHeaderProps & {
  children: ReactNode;
  containerClassName?: string;
};

export function ContentLayout({
  children,
  containerClassName,
  ...headerProps
}: ContentLayoutProps) {
  return (
    <div className={cn('container mx-auto space-y-6', containerClassName)}>
      <PageHeader {...headerProps} />
      {children}
    </div>
  );
}
