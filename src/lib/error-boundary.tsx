import { Button } from '@heroui/react';
import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

type ErrorBoundaryProps = {
  children: ReactNode;
};

export const MainErrorFallback = () => {
  return (
    <div
      className='flex min-h-dvh flex-col items-center justify-center p-6 text-center'
      role='alert'
    >
      <h2 className='font-semibold text-lg'>
        Oops! That didn’t work as expected.
      </h2>
      <p className='mt-2 max-w-md text-muted text-sm'>
        We’ve been notified and will fix it soon.
      </p>
      <Button
        className='mt-4'
        onPress={() => {
          window.location.assign(window.location.origin);
        }}
        size='sm'
      >
        Refresh
      </Button>
    </div>
  );
};

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={MainErrorFallback}
      onError={(error, info) => {
        if (import.meta.env.DEV) {
          console.error('CrashBoundary caught an error:', error, info);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
