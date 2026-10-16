import { Alert, Button, cn, Spinner } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { ReactElement, ReactNode } from 'react';

type QueryStateErrorProps = {
  description?: ReactNode;
  onBack?: () => void;
  onRetry?: () => void;
  showBack?: boolean;
  title?: ReactNode;
};

function QueryStateError({
  description,
  onBack,
  onRetry,
  showBack = true,
  title,
}: QueryStateErrorProps) {
  const { _ } = useLingui();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  };

  const hasActions = Boolean(onRetry || showBack);

  const renderButtons = (className?: string) => {
    if (!hasActions) return null;

    return (
      <div className={cn('flex items-center gap-2', className)}>
        {showBack ? (
          <Button onPress={handleBack} size='sm' variant='tertiary'>
            {_(msg`Go back`)}
          </Button>
        ) : null}
        {onRetry ? (
          <Button onPress={onRetry} size='sm' variant='danger'>
            {_(msg`Retry`)}
          </Button>
        ) : null}
      </div>
    );
  };

  return (
    <Alert status='danger'>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title ?? _(msg`Error`)}</Alert.Title>
        <Alert.Description>
          {description ?? _(msg`Something went wrong while loading data.`)}
        </Alert.Description>
        {renderButtons('mt-3 sm:hidden')}
      </Alert.Content>
      {renderButtons('hidden sm:flex')}
    </Alert>
  );
}

function QueryStateSpinner() {
  return (
    <div className='flex h-48 w-full items-center justify-center'>
      <Spinner size='lg' />
    </div>
  );
}

export type QueryStateProps<TData> = {
  children: (data: NonNullable<TData>) => ReactNode;
  data?: TData | null;
  errorDescription?: ReactNode;
  errorFallback?: ReactNode;
  errorTitle?: ReactNode;
  fallback?: ReactNode;
  isError: boolean;
  isPending: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  showBack?: boolean;
};

type QueryStateCompound = (<TData>(
  props: QueryStateProps<TData>
) => ReactElement) & {
  Error: typeof QueryStateError;
  Spinner: typeof QueryStateSpinner;
};

export const QueryState = (<TData,>({
  children,
  data,
  errorDescription,
  errorFallback,
  errorTitle,
  fallback,
  isError,
  isPending,
  onBack,
  onRetry,
  showBack,
}: QueryStateProps<TData>) => {
  if (isPending) {
    return (fallback ?? <QueryStateSpinner />) as ReactElement;
  }

  if (isError || data == null) {
    return (errorFallback ?? (
      <QueryStateError
        description={errorDescription}
        onBack={onBack}
        onRetry={onRetry}
        showBack={showBack}
        title={errorTitle}
      />
    )) as ReactElement;
  }

  return children(data as NonNullable<TData>) as ReactElement;
}) as QueryStateCompound;

QueryState.Error = QueryStateError;
QueryState.Spinner = QueryStateSpinner;
