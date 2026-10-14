import { Button, Spinner } from '@heroui/react';
import type { ReactNode } from 'react';

import { useFormContext } from '../form-context';

type FormSubmitButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  isDisabled?: boolean;
};

/**
 * Submit button bound to the surrounding form: it renders the pending spinner
 * while the form is submitting. Subscribing here means only this button
 * re-renders, not the whole view that owns the form.
 */
export function FormSubmitButton({
  children,
  fullWidth,
  isDisabled,
}: FormSubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          fullWidth={fullWidth}
          isDisabled={isDisabled}
          isPending={isSubmitting}
          type='submit'
        >
          {isSubmitting ? <Spinner color='current' size='sm' /> : null}
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
