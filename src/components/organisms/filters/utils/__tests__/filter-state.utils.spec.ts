import { describe, expect, it } from 'vitest';

import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import {
  hasActiveFilterFields,
  isFilterValueActive,
} from '@/components/organisms/filters/utils/filter-state.utils';

describe('filter-state.utils', () => {
  describe('isFilterValueActive', () => {
    it('returns false for undefined, null, or empty string', () => {
      expect(isFilterValueActive(undefined, 'initial')).toBe(false);
      expect(isFilterValueActive(null, 'initial')).toBe(false);
      expect(isFilterValueActive('', 'initial')).toBe(false);
    });

    it('returns false for empty arrays', () => {
      expect(isFilterValueActive([], ['initial'])).toBe(false);
    });

    it('returns true for non-empty arrays', () => {
      expect(isFilterValueActive(['val1', 'val2'], ['initial'])).toBe(true);
    });

    it('returns false when current matches initial value', () => {
      expect(isFilterValueActive('status', 'status')).toBe(false);
      expect(isFilterValueActive(10, 10)).toBe(false);
      expect(isFilterValueActive(false, false)).toBe(false);
    });

    it('returns true when current does not match initial value', () => {
      expect(isFilterValueActive('status', 'other')).toBe(true);
      expect(isFilterValueActive(10, 20)).toBe(true);
      expect(isFilterValueActive(true, false)).toBe(true);
    });

    it('properly handles zero (0) and boolean false as active values', () => {
      expect(isFilterValueActive(0, 10)).toBe(true);
      expect(isFilterValueActive(false, true)).toBe(true);
    });
  });

  describe('hasActiveFilterFields', () => {
    type TestState = {
      categoryId?: string;
      isActive?: boolean;
      status?: string;
    };

    const initialState: TestState = {
      categoryId: undefined,
      isActive: true,
      status: 'pending',
    };

    const fields: FilterFieldConfig<TestState>[] = [
      { key: 'categoryId', label: 'Category', type: 'select' },
      { key: 'isActive', label: 'Active', type: 'select' },
      { key: 'status', label: 'Status', type: 'select' },
    ];

    it('returns false when search state is empty', () => {
      expect(hasActiveFilterFields({}, initialState, fields)).toBe(false);
    });

    it('returns false when search state matches initial state', () => {
      expect(
        hasActiveFilterFields(
          { categoryId: undefined, isActive: true, status: 'pending' },
          initialState,
          fields
        )
      ).toBe(false);
    });

    it('returns true when a field differs from initial state', () => {
      expect(
        hasActiveFilterFields({ status: 'completed' }, initialState, fields)
      ).toBe(true);

      expect(
        hasActiveFilterFields({ isActive: false }, initialState, fields)
      ).toBe(true);

      expect(
        hasActiveFilterFields({ categoryId: 'cat-123' }, initialState, fields)
      ).toBe(true);
    });

    it('ignores fields not present in the fields configuration', () => {
      const limitedFields: FilterFieldConfig<TestState>[] = [
        { key: 'categoryId', label: 'Category', type: 'select' },
      ];

      // Even if 'status' is different, it's not in the fields array
      expect(
        hasActiveFilterFields(
          { status: 'completed' },
          initialState,
          limitedFields
        )
      ).toBe(false);
    });
  });
});
