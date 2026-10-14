import type {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  FormValidators,
} from '@tanstack/react-form';
import type { input as ZodInput, ZodType } from 'zod';

type Sync<T> = FormValidateOrFn<T> | undefined;
type Async<T> = FormAsyncValidateOrFn<T> | undefined;

export type FormValidatorsType<TSchema extends ZodType> = FormValidators<
  ZodInput<TSchema>,
  Sync<ZodInput<TSchema>>,
  Sync<ZodInput<TSchema>>,
  Async<ZodInput<TSchema>>,
  Sync<ZodInput<TSchema>>,
  Async<ZodInput<TSchema>>,
  Sync<ZodInput<TSchema>>,
  Async<ZodInput<TSchema>>,
  Sync<ZodInput<TSchema>>,
  Async<ZodInput<TSchema>>
>;

export function createFormValidators<TSchema extends ZodType>(
  schema: TSchema
): FormValidatorsType<TSchema> {
  return {
    onChange: schema,
    onSubmit: schema,
  } as unknown as FormValidatorsType<TSchema>;
}
