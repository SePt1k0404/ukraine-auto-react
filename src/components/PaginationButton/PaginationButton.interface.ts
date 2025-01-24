export interface IPaginationButtonProps {
  pageNumber: number | string;
  handlePageChange: (pageNumber: number) => void;
  page: number;
  scrollToTop: () => void;
}
