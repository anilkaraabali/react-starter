import type { AnyFieldApi } from '@tanstack/react-form';

/**
 * No `onBlur` validator: its errors only refresh on the next blur, and a stale
 * one keeps `canSubmit` false. Blur marks the field touched and re-runs `onChange`.
 */
export function handleFieldBlur(field: AnyFieldApi) {
  field.handleBlur();
  field.validate('change');
}
