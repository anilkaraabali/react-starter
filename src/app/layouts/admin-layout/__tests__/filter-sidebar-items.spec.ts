import { msg } from '@lingui/core/macro';
import { describe, expect, it } from 'vitest';
import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';
import { filterSidebarItems } from '../filter-sidebar-items';

type Policy = 'admin' | 'staff';

const items: readonly SidebarNavItem<Policy>[] = [
  { label: msg`Dashboard`, to: '/dashboard' },
  { label: msg`Settings`, policy: 'admin', to: '/settings' },
  {
    children: [
      { label: msg`Customers`, to: '/customer' },
      { label: msg`Groups`, policy: 'admin', to: '/customer/groups' },
    ],
    label: msg`Customers`,
  },
  {
    children: [{ label: msg`Campaigns`, policy: 'admin', to: '/discount' }],
    label: msg`Discounts`,
  },
];

const tos = (list: readonly SidebarNavItem<Policy>[]) =>
  list.map((item) => item.to ?? item.label.message);

describe('filterSidebarItems', () => {
  it('keeps everything the user is allowed to see', () => {
    expect(filterSidebarItems(items, () => true)).toEqual(items);
  });

  it('hides a top-level item whose policy is denied', () => {
    const result = filterSidebarItems(items, (policy) => policy !== 'admin');

    expect(tos(result)).not.toContain('/settings');
    expect(tos(result)).toContain('/dashboard');
  });

  it('filters the children of a group', () => {
    const result = filterSidebarItems(items, (policy) => policy !== 'admin');
    const group = result.find((item) => item.children);

    expect(group?.children?.map((child) => child.to)).toEqual(['/customer']);
  });

  it('drops a group when no children remain', () => {
    const result = filterSidebarItems(items, (policy) => policy !== 'admin');

    expect(tos(result)).not.toContain('Discounts');
  });

  it('does not mutate the input', () => {
    filterSidebarItems(items, () => false);

    expect(items[2]?.children).toHaveLength(2);
  });
});
