import { useMemo } from 'react';

export const usePageNumbers = (totalPages: number, page: number) => {
  return useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 3) pages.push(1, '...');
      for (
        let i = Math.max(1, page - 1);
        i <= Math.min(totalPages, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...', totalPages);
    }

    return pages;
  }, [totalPages, page]);
};
