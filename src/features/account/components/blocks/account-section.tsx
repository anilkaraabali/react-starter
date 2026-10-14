import { cn } from '@heroui/react';
import type { AccountBlockProps } from './account-blocks.types';

type SectionProps = AccountBlockProps & {
  id?: string;
};

export const Sections = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-sections', className)}>{children}</div>
);

export const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn('account-section', className)} id={id}>
    {children}
  </section>
);

export const List = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-section-list', className)}>{children}</div>
);

export const SubSection = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-sub-section', className)}>{children}</div>
);

export const SubSectionList = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-sub-section-list', className)}>{children}</div>
);

export const SettingsChunk = ({ children, className }: AccountBlockProps) => (
  <div className={cn('account-settings-chunk', className)}>{children}</div>
);
