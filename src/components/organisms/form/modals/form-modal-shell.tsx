import type { ComponentType, ReactNode } from 'react';
import type { FormRootProps } from '../form-components/form-root';
import { FormModal } from './form-modal';
import { type FormModalForm, useFormModal } from './use-form-modal';

/**
 * A form plus the two bound components the shell renders.
 *
 * `AppForm` and `Root` keep their real prop types, so no cast is needed. The
 * form keeps its exact type too, so `children` receives a form that its
 * fields accept.
 */
type ShellForm = FormModalForm & {
  AppForm: ComponentType<{ children?: ReactNode }>;
  Root: (props: FormRootProps) => ReactNode;
};

type FormModalShellProps<TForm extends ShellForm> = {
  children: (form: TForm) => ReactNode;
  form: TForm;
  isOpen: boolean;
  onClose: () => void;
  submitLabel: ReactNode;
  title: ReactNode;
};

/**
 * Binds a form to `FormModal`: owns the `<form>` id, the submit state, the
 * reset on open, and the `AppForm` / `Root` wrappers.
 *
 * Pass `defaultValues` to the form options. `reset()` then picks up the
 * latest ones.
 */
export function FormModalShell<TForm extends ShellForm>({
  children,
  form,
  isOpen,
  onClose,
  submitLabel,
  title,
}: FormModalShellProps<TForm>) {
  const { formId, isPending } = useFormModal({ form, isOpen });

  return (
    <FormModal
      formId={formId}
      isOpen={isOpen}
      isPending={isPending}
      onClose={onClose}
      submitLabel={submitLabel}
      title={title}
    >
      <form.AppForm>
        <form.Root id={formId}>{children(form)}</form.Root>
      </form.AppForm>
    </FormModal>
  );
}
