import { cn, Skeleton, Typography } from '@heroui/react';
import {
  type ComponentProps,
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';

import { FALLBACK_VALUE } from '@/config/string';

type TypographySize = ComponentProps<typeof Typography.Paragraph>['size'];

export type SimpleDetailFieldProps = {
  className?: string;
  direction?: 'column' | 'row';
  label: ReactNode;
  textSize?: TypographySize;
  value?: ReactNode;
  wrap?: boolean;
};

type SimpleDetailFieldRowProps = Omit<SimpleDetailFieldProps, 'direction'>;
type SimpleDetailFieldColumnProps = Omit<SimpleDetailFieldProps, 'direction'>;

type SimpleDetailFieldGroupProps = {
  children: ReactNode;
  loading: boolean;
};

type SimpleDetailFieldCompound = ((
  props: SimpleDetailFieldProps
) => ReactElement) & {
  Column: (props: SimpleDetailFieldColumnProps) => ReactElement;
  Group: (props: SimpleDetailFieldGroupProps) => ReactElement;
  Row: (props: SimpleDetailFieldRowProps) => ReactElement;
};

const SimpleDetailFieldLoadingContext = createContext(false);

export const SimpleDetailField = (({
  className,
  direction = 'row',
  label,
  textSize = 'sm',
  value = FALLBACK_VALUE,
  wrap = true,
}: SimpleDetailFieldProps) => {
  const loading = useContext(SimpleDetailFieldLoadingContext);
  const isTextValue = typeof value === 'string' || typeof value === 'number';

  let content: ReactNode;

  if (loading) {
    content = <Skeleton className='h-7 w-3/5 rounded-md' />;
  } else if (isTextValue) {
    content = (
      <Typography.Paragraph className='min-w-0' size={textSize} weight='medium'>
        {value}
      </Typography.Paragraph>
    );
  } else {
    content = <div className='min-w-0'>{value}</div>;
  }

  return (
    <div
      className={cn(
        'flex min-w-0',
        direction === 'column' ? 'flex-col' : 'flex-row items-baseline gap-1',
        wrap && direction === 'row' ? 'flex-wrap' : null,
        className
      )}
    >
      <Typography.Paragraph color='muted' size={textSize}>
        {label}
        {direction === 'row' ? ':' : null}
      </Typography.Paragraph>
      {content}
    </div>
  );
}) as SimpleDetailFieldCompound;

function SimpleDetailFieldRow({
  textSize = 'base',
  ...props
}: SimpleDetailFieldRowProps) {
  return <SimpleDetailField {...props} direction='row' textSize={textSize} />;
}

function SimpleDetailFieldColumn({
  textSize = 'base',
  ...props
}: SimpleDetailFieldColumnProps) {
  return (
    <SimpleDetailField {...props} direction='column' textSize={textSize} />
  );
}

function SimpleDetailFieldGroup({
  children,
  loading,
}: SimpleDetailFieldGroupProps) {
  return (
    <SimpleDetailFieldLoadingContext.Provider value={loading}>
      {children}
    </SimpleDetailFieldLoadingContext.Provider>
  );
}

SimpleDetailField.Row = SimpleDetailFieldRow;
SimpleDetailField.Column = SimpleDetailFieldColumn;
SimpleDetailField.Group = SimpleDetailFieldGroup;
