import { Typography } from '@heroui/react';
import type { ReactNode } from 'react';

import Shape from '@/assets/error-grid-pattern.svg?react';

type ErrorLayoutProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
};

export function ErrorLayout({
  actions,
  children,
  description,
  icon,
  title,
}: ErrorLayoutProps) {
  return (
    <div className='relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6'>
      <div className='absolute top-0 right-0 -z-1 w-full max-w-62.5 xl:max-w-112.5'>
        <Shape />
      </div>
      <div className='absolute bottom-0 left-0 -z-1 w-full max-w-62.5 rotate-180 xl:max-w-112.5'>
        <Shape />
      </div>
      <div className='flex flex-col items-center'>
        {icon}
        <div className='mt-10 max-w-lg text-center'>
          <Typography
            className='text-center'
            render={({ children: headingChildren, ...domProps }) => (
              <h2 {...domProps}>{headingChildren}</h2>
            )}
            type='h4'
          >
            {title}
          </Typography>
          <Typography.Paragraph className='mt-2 text-center'>
            {description}
          </Typography.Paragraph>
          {actions && (
            <div className='mt-6 flex flex-col items-center justify-center gap-2'>
              {actions}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
