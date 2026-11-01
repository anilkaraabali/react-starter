import { plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

type TablePaginationSummaryProps = {
  page: number;
  pageSize: number;
  total: number;
};

/**
 * Left-hand result count of a pagination footer, e.g. "Showing 11-20 of 42 results".
 * The range is derived from page and page size and clamped to the total.
 */
export function TablePaginationSummary({
  page,
  pageSize,
  total,
}: TablePaginationSummaryProps) {
  const { i18n, t } = useLingui();

  if (total <= 0) {
    return t({
      comment: 'Pagination summary shown when a table or list has no results',
      message: 'No results',
    });
  }

  const numberFormat = new Intl.NumberFormat(i18n.locale);
  const from = numberFormat.format(Math.min((page - 1) * pageSize + 1, total));
  const to = numberFormat.format(Math.min(page * pageSize, total));

  return t({
    comment:
      'Pagination summary, e.g. "Showing 11-20 of 42 results". {from} and {to} are the first and last row numbers on the current page; the count at the end is the total number of results',
    message: `Showing ${from}-${to} of ${plural(total, {
      one: '# result',
      other: '# results',
    })}`,
  });
}
