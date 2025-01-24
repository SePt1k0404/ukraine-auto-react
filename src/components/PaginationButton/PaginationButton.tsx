import { IPaginationButtonProps } from './PaginationButton.interface';

export const PaginationButton = ({
  pageNumber,
  handlePageChange,
  page,
  scrollToTop,
}: IPaginationButtonProps) => (
  <button
    onClick={() => {
      handlePageChange(Number(pageNumber));
      scrollToTop();
    }}
    className={`py-1 px-3 rounded ${
      pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
    }`}
    disabled={typeof pageNumber === 'string' || pageNumber === page}
  >
    {pageNumber}
  </button>
);
