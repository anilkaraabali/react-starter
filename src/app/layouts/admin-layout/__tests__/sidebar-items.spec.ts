import { describe, expect, it } from 'vitest';
import { findActiveTo } from '@/components/organisms/sidebar/sidebar.utils';
import { SIDEBAR_ITEMS } from '../sidebar-items';

describe('SIDEBAR_ITEMS', () => {
  it('keeps every top-level entry a group, so no group has a `to`', () => {
    for (const item of SIDEBAR_ITEMS) {
      expect(item.children?.length).toBeGreaterThan(0);
      expect(item.to).toBeUndefined();
    }
  });

  it('uses a unique message id per group, because it keys the collapse state', () => {
    const ids = SIDEBAR_ITEMS.map((item) => item.label.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('lists the main pages under the Overview group first', () => {
    const [overview] = SIDEBAR_ITEMS;

    expect(overview?.label.message).toBe('Overview');
    expect(overview?.children?.[0]?.to).toBe('/dashboard');
  });

  it('highlights only the longest matching link', () => {
    expect(findActiveTo(SIDEBAR_ITEMS, '/dashboard')).toBe('/dashboard');
    expect(findActiveTo(SIDEBAR_ITEMS, '/products/123/edit')).toBe('/products');
    expect(findActiveTo(SIDEBAR_ITEMS, '/unknown')).toBeUndefined();
  });
});
