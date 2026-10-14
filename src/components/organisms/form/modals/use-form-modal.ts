import { useSelector } from '@tanstack/react-form';
import { useEffect, useId } from 'react';

/** Store that `useSelector` can read `isSubmitting` from. */
type IsSubmittingStore = Parameters<
  typeof useSelector<{ isSubmitting: boolean }, boolean>
>[0];

/** The slice of a TanStack form that a modal shell needs. */
export type FormModalForm = {
  reset: () => void;
  store: IsSubmittingStore;
};

type UseFormModalOptions = {
  form: FormModalForm;
  isOpen: boolean;
};

/**
 * Owns the state a form modal needs: the `<form>` id, the submit state that
 * `FormModal` renders, and the reset back to `defaultValues` on every open.
 *
 * Pass `defaultValues` to the form options. `reset()` then picks up the latest
 * ones, so callers do not have to restate them as reset values.
 */
export function useFormModal({ form, isOpen }: UseFormModalOptions) {
  const formId = useId();
  const isPending = useSelector(form.store, (state) => state.isSubmitting);

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [form, isOpen]);

  return { formId, isPending };
}
