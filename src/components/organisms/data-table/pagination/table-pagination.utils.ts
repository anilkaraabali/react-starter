type PaginationPage = 'ellipsis-end' | 'ellipsis-start' | number;

export function buildPaginationPages(
  currentPage: number,
  totalPages: number
): PaginationPage[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: PaginationPage[] = [1];

  if (currentPage > 3) {
    pages.push('ellipsis-start');
  }

  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  for (let page = rangeStart; page <= rangeEnd; page++) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis-end');
  }

  pages.push(totalPages);

  return pages;
}
