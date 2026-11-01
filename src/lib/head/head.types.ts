import type { MessageDescriptor } from '@lingui/core';

/**
 * A `<meta>` tag. Routes declare tags on `staticData.meta` with a translatable
 * `MessageDescriptor`; data-dependent tags carry the final string.
 */
export type MetaTag<TContent = MessageDescriptor> =
  | { content: TContent; name: string }
  | { content: TContent; property: string };

/** Data-dependent head info (e.g. the loaded entity's name) set by a page. */
export type Head = {
  meta?: readonly MetaTag<string>[];
  /** Entity name that replaces the route's static title (e.g. `Acme` instead of `Edit product`). */
  title?: string;
};
