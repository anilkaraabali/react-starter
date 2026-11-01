import type { MessageDescriptor } from '@lingui/core';

/** Complete `key → MessageDescriptor` map (enum / status / option labels). */
export type MessageDescriptorMap<TKey extends string> = Record<
  TKey,
  MessageDescriptor
>;

/** `t` from `useLingui()` (or any resolver) that turns a `msg` descriptor into text. */
export type Translate = (descriptor: MessageDescriptor) => string;
