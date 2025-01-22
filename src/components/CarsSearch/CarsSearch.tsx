import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import { ICarsSearchProps } from './CarsSearch.interface';

export const CarsSearch = ({ className }: ICarsSearchProps) => {
  const [minPrice, setMinPrice] = useState<string>('all');
  const [yearFrom, setYearFrom] = useState<string>('all');

  const handleResetFilters = (): void => {
    setMinPrice('all');
    setYearFrom('all');
  };

  return (
    <div
      className={clsx(
        'flex flex-row gap-5 bg-custom-gradient-light p-5 rounded-2xl shadow-lg mb-5',
        className,
      )}
    >
      <div className='flex justify-start flex-grow mr-5'>
        <input
          className='w-full py-1 px-4 text-lg border-solid border-[1px] border-[#e0e0e0]
          rounded-lg outline-none bg-background-card-light transition-colors ease hover:border-main-color focus:border-main-color duration-300'
          type='text'
          placeholder='Search car...'
        />
      </div>
      <div className='flex justify-start items-center gap-5 flex-nowrap'>
        <label className='flex flex-col text-sm font-medium gap-2'>
          Year From:
          <select
            className='px-3 py-2 border-solid border-[1px] border-gray-400 outline-none bg-background-card-light transition-colors ease hover:border-main-color active:border-main-color focus:border-main-color duration-300'
            value={yearFrom}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setYearFrom(e.target.value)
            }
          >
            <option key={'all'} value={'all'}>
              {'All'}
            </option>
            {Array.from(
              { length: 126 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className='flex flex-col text-sm font-medium gap-2'>
          Min Price:
          <select
            className='px-3 py-2 border-solid border-[1px] border-gray-400 outline-none bg-background-card-light transition-colors ease hover:border-main-color active:border-main-color focus:border-main-color duration-300'
            value={minPrice}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setMinPrice(e.target.value)
            }
          >
            <option key={'all'} value={'all'}>
              {'All'}
            </option>
            {Array.from({ length: 200 }, (_, i) => 500 + i * 500).map(
              (price) => (
                <option key={price} value={price}>
                  ${price.toLocaleString()}
                </option>
              ),
            )}
          </select>
        </label>
        <label className='flex flex-col text-sm font-medium gap-2'>
          Sort by Price:
          <select className='px-3 py-2 border-solid border-[1px] border-gray-400 outline-none bg-background-card-light transition-colors ease hover:border-main-color active:border-main-color focus:border-main-color duration-300'>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </label>
      </div>
      <button
        className='bg-main-red-color text-white border-solid border-[1px] border-main-red-color outline-none px-5 py-3 rounded-md cursor-pointer transition-colors ease hover:bg-accent-red-color focus:bg-accent-red-color duration-300'
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};
