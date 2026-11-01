import type { I18n } from '@lingui/core';
import type { MetaTag } from '@/lib/head/head.types';

/** `name` / `property` of a tag; the deepest tag wins per key. */
export function getMetaTagKey<TContent>(tag: MetaTag<TContent>): string {
  return 'name' in tag ? `name:${tag.name}` : `property:${tag.property}`;
}

/** Keeps one tag per key. `tags` are ordered root to leaf, so later tags win. */
export function mergeMetaTags<TContent>(
  tags: readonly MetaTag<TContent>[]
): MetaTag<TContent>[] {
  const merged = new Map<string, MetaTag<TContent>>();

  for (const tag of tags) {
    merged.set(getMetaTagKey(tag), tag);
  }

  return Array.from(merged.values());
}

/** Translates a static tag's content with the active locale. */
export function resolveMetaTag(tag: MetaTag, i18n: I18n): MetaTag<string> {
  const content = i18n._(tag.content);

  return 'name' in tag
    ? { content, name: tag.name }
    : { content, property: tag.property };
}

/** The entity's own title when there is one; otherwise the route's static title. */
export function composePageTitle(
  staticTitle: string | undefined,
  entityTitle: string | undefined
): string | undefined {
  return entityTitle || staticTitle;
}
