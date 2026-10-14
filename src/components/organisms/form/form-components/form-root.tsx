import { cn, Form, type FormProps } from '@heroui/react';

import { useFormContext } from '../form-context';

export type FormRootProps = Omit<FormProps, 'onSubmit'> & {
  children: React.ReactNode;
};

export function FormRoot({
  className,
  children,
  validationBehavior = 'aria',
  ...props
}: FormRootProps) {
  const form = useFormContext();

  return (
    <Form
      validationBehavior={validationBehavior}
      {...props}
      className={cn('flex flex-col gap-4', className)}
      onSubmit={(event) => {
        event.preventDefault();
        // A second submit while pending would hit `onSubmitInvalid` (canSubmit is false).
        if (form.state.isSubmitting) return;
        form.handleSubmit().catch(() => {
          // Error toast handled by mutation / global handler
        });
      }}
    >
      {children}
    </Form>
  );
}
