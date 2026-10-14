import { Description, FieldError } from '@heroui/react';
import type { ReactNode } from 'react';

type FormFieldFooterProps = {
  description?: ReactNode;
  errorMessage?: string;
};

export function FormFieldFooter({
  description,
  errorMessage,
}: FormFieldFooterProps) {
  if (errorMessage) {
    return <FieldError>{errorMessage}</FieldError>;
  }

  if (description) {
    return <Description>{description}</Description>;
  }

  return null;
}
