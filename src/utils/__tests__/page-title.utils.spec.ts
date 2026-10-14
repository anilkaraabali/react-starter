import type { MessageDescriptor } from '@lingui/core';
import { describe, expect, it } from 'vitest';

const { getPageTitleTemplate } = await import('@/utils/page-title.utils');

/** `i18n._` receives a descriptor, not a string, once the real macro runs. */
const translate = (id: MessageDescriptor) => id.message ?? id.id;

describe('page-title.utils', () => {
  describe('getPageTitleTemplate', () => {
    it('keeps the %s placeholder so the route title lands in front', () => {
      const i18n = { _: (id: MessageDescriptor) => translate(id) } as never;

      expect(getPageTitleTemplate(i18n)).toBe('%s • Admin Starter');
    });

    it('appends the translated app name', () => {
      const i18n = {
        _: (id: MessageDescriptor) => `tr:${translate(id)}`,
      } as never;

      expect(getPageTitleTemplate(i18n)).toBe('%s • tr:Admin Starter');
    });
  });
});
