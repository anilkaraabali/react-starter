import type { I18n } from '@lingui/core';

type MetaObject =
  | { content: string; name: string }
  | { content: string; property: string }
  | { title: string };

export type MetaFunction<
  T extends Record<string, unknown> = Record<string, unknown>,
> = (i18n: I18n, args: Partial<T>) => MetaObject[];

export type LoaderData = Record<string, unknown> & {
  meta?: MetaFunction;
};
