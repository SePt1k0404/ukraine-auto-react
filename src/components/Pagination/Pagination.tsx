import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { IPaginationProps } from './Pagination.interface';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { PaginationButton } from '../PaginationButton/PaginationButton';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { usePageNumbers } from '../../helpers/paginationHelpers/getPageNumbers';
import { getCars } from '../../features/carsList/carsListSliceFunctions/getCars';

export const Pagination = ({ limit, carsListType }: IPaginationProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const {
    allCarsLength,
    lastVisibleCar,
    previousVisibleCar,
    isLoading,
    carsQuery,
  } = useSelector((state: RootState) => state.carsListReducer);

  const favoriteCarsId = useSelector(
    (state: RootState) => state.userProfileReducer.favoritesCars,
  );

  const totalPages = useMemo(
    () => Math.ceil(allCarsLength / limit),
    [allCarsLength, limit],
  );

  useEffect(() => {
    setPage(1);
  }, [carsQuery]);

  const [page, setPage] = useState<number>(1);

  const pageNumbers = usePageNumbers(totalPages, page);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages && carsQuery !== undefined) {
        setPage(newPage);
        dispatch(
          getCars({
            lastVisibleCar: newPage > page ? lastVisibleCar : undefined,
            previousVisibleCar: newPage < page ? previousVisibleCar : undefined,
            carsQuery,
            carsListType,
            favoriteList: favoriteCarsId,
          }),
        );
      }
    },
    [page, totalPages, lastVisibleCar, previousVisibleCar, carsQuery, dispatch],
  );

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      <button
        onClick={() => {
          handlePageChange(page - 1);
        }}
        disabled={page === 1 || isLoading}
        className='py-1 px-3 rounded bg-gray-200 disabled:opacity-50'
      >
        Previous
      </button>
      {isLoading ? (
        <div className='flex justify-center items-center py-2 px-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'></div>
        </div>
      ) : (
        pageNumbers.map((p, index) =>
          typeof p === 'string' ? (
            <span key={index} className='py-1 px-3'>
              ...
            </span>
          ) : (
            <PaginationButton
              key={index}
              pageNumber={p}
              handlePageChange={handlePageChange}
              page={page}
              scrollToTop={scrollToTop}
            />
          ),
        )
      )}
      <button
        onClick={() => {
          handlePageChange(page + 1);
        }}
        disabled={page === totalPages || isLoading}
        className='py-1 px-3 rounded bg-gray-200 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};
