import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { IPaginationProps } from './Pagination.interface';
import { useEffect, useState } from 'react';
import { getCars } from '../../features/carsList/carsListSlice';

export const Pagination = ({ limit }: IPaginationProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { allCarsLength, lastVisibleCar, previousVisibleCar, isLoading } =
    useSelector((state: RootState) => state.carsListReducer);

  useEffect(() => {
    setTotalPages(Math.ceil(allCarsLength / limit));
  }, [allCarsLength]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      if (newPage > page) {
        dispatch(
          getCars({
            lastVisibleCar: lastVisibleCar,
            previousVisibleCar: undefined,
          }),
        );
      } else {
        dispatch(
          getCars({
            lastVisibleCar: undefined,
            previousVisibleCar: previousVisibleCar,
          }),
        );
      }
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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
  };

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      <button
        onClick={() => handlePageChange(page - 1)}
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
        getPageNumbers().map((p, index) =>
          p === '...' ? (
            <span key={index} className='py-1 px-3'>
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(Number(p))}
              className={`py-1 px-3 rounded ${
                p === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {p}
            </button>
          ),
        )
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages || isLoading}
        className='py-1 px-3 rounded bg-gray-200 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};
