import type { MessageDescriptor } from '@lingui/core';

/** Complete `key → MessageDescriptor` map (enum / status / option labels). */
export type MessageDescriptorMap<TKey extends string> = Record<
  TKey,
  MessageDescriptor
>;
