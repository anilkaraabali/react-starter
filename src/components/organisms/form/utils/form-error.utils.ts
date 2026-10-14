import type { AnyFieldMeta } from '@tanstack/react-form';

const FIELD_ERROR_SOURCES = ['onSubmit', 'onChange'] as const;

function getValidationMessage(error: unknown): string {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return String(error);
}

function getFieldErrorFromMap(meta: AnyFieldMeta): string {
  for (const source of FIELD_ERROR_SOURCES) {
    const message = getValidationMessage(meta.errorMap?.[source]);
    if (message) {
      return message;
    }
  }

  return '';
}

export function getFormError(meta: AnyFieldMeta): string {
  if (!meta.isTouched) {
    return '';
  }

  if (meta.errors?.length) {
    return getValidationMessage(meta.errors[0]);
  }

  return getFieldErrorFromMap(meta);
}
