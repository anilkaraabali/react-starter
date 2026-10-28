import { msg } from '@lingui/core/macro';
import { describe, expect, it } from 'vitest';
import type { SidebarNavItem } from '../sidebar.types';
import { findActiveTo } from '../sidebar.utils';

const items: readonly SidebarNavItem[] = [
  { label: msg`Dashboard`, to: '/dashboard' },
  {
    children: [
      { label: msg`Products`, to: '/product' },
      { label: msg`Brands`, to: '/product/definitions/brands' },
    ],
    label: msg`Products`,
  },
];

describe('findActiveTo', () => {
  it('matches a standalone item', () => {
    expect(findActiveTo(items, '/dashboard')).toBe('/dashboard');
  });

  it('prefers the longest matching child', () => {
    expect(findActiveTo(items, '/product/definitions/brands/create')).toBe(
      '/product/definitions/brands'
    );
  });

  it('keeps the parent entry active on nested routes', () => {
    expect(findActiveTo(items, '/product/123/edit')).toBe('/product');
  });

  it('never activates the group row itself', () => {
    expect(findActiveTo(items, '/unrelated')).toBeUndefined();
  });

  it('returns undefined when nothing matches', () => {
    expect(findActiveTo(items, '/unknown')).toBeUndefined();
  });
});
