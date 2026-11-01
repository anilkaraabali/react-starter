import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { describe, expect, it } from 'vitest';
import type { MetaTag } from '@/lib/head/head.types';
import {
  composePageTitle,
  getMetaTagKey,
  mergeMetaTags,
  resolveMetaTag,
} from '@/lib/head/head.utils';

describe('head.utils', () => {
  describe('getMetaTagKey', () => {
    it('keeps name and property keys apart', () => {
      expect(getMetaTagKey({ content: 'A', name: 'robots' })).toBe(
        'name:robots'
      );
      expect(getMetaTagKey({ content: 'A', property: 'og:title' })).toBe(
        'property:og:title'
      );
      expect(getMetaTagKey({ content: 'A', name: 'x' })).not.toBe(
        getMetaTagKey({ content: 'A', property: 'x' })
      );
    });
  });

  describe('mergeMetaTags', () => {
    it('lets the deepest tag win per key', () => {
      const root: MetaTag = { content: msg`Root`, name: 'description' };
      const leaf: MetaTag = { content: msg`Leaf`, name: 'description' };
      const other: MetaTag = { content: msg`OG`, property: 'og:title' };

      expect(mergeMetaTags([root, other, leaf])).toEqual([leaf, other]);
    });

    it('lets a dynamic tag override a resolved static tag', () => {
      const staticTag = resolveMetaTag(
        { content: msg`Static`, name: 'description' },
        i18n
      );
      const dynamicTag: MetaTag<string> = {
        content: 'Acme',
        name: 'description',
      };

      expect(mergeMetaTags([staticTag, dynamicTag])).toEqual([dynamicTag]);
    });

    it('returns an empty list when no route declares meta', () => {
      expect(mergeMetaTags([])).toEqual([]);
    });
  });

  describe('resolveMetaTag', () => {
    it('translates the content and keeps the name or property', () => {
      expect(
        resolveMetaTag({ content: msg`Hello`, name: 'description' }, i18n)
      ).toEqual({ content: 'Hello', name: 'description' });
      expect(
        resolveMetaTag({ content: msg`Hello`, property: 'og:title' }, i18n)
      ).toEqual({ content: 'Hello', property: 'og:title' });
    });
  });

  describe('composePageTitle', () => {
    it('replaces the static title with the entity name', () => {
      expect(composePageTitle('Edit product', 'Acme')).toBe('Acme');
    });

    it('falls back to the static title until the entity has loaded', () => {
      expect(composePageTitle('Edit product', undefined)).toBe('Edit product');
      expect(composePageTitle('Edit product', '')).toBe('Edit product');
    });

    it('uses the entity name when there is no static title', () => {
      expect(composePageTitle(undefined, 'Acme')).toBe('Acme');
    });

    it('returns undefined when neither exists', () => {
      expect(composePageTitle(undefined, undefined)).toBeUndefined();
    });
  });
});
