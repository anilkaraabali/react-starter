import { describe, expect, it } from 'vitest';
import { buildPaginationPages } from '../table-pagination.utils';

describe('buildPaginationPages', () => {
  it('returns all pages when totalPages <= 7', () => {
    expect(buildPaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPaginationPages(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('includes ellipsis-end when at the start of a large set', () => {
    expect(buildPaginationPages(1, 10)).toEqual([1, 2, 'ellipsis-end', 10]);
    expect(buildPaginationPages(2, 10)).toEqual([1, 2, 3, 'ellipsis-end', 10]);
  });

  it('includes both ellipses when in the middle of a large set', () => {
    expect(buildPaginationPages(5, 10)).toEqual([
      1,
      'ellipsis-start',
      4,
      5,
      6,
      'ellipsis-end',
      10,
    ]);
  });

  it('includes ellipsis-start when near the end of a large set', () => {
    expect(buildPaginationPages(9, 10)).toEqual([
      1,
      'ellipsis-start',
      8,
      9,
      10,
    ]);
  });
});
