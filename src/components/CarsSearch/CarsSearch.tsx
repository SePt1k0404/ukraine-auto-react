import { ChangeEvent, useState } from 'react';
import styles from './CarsSearch.module.css';
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
    <div className={clsx(styles['cars-search__container'], className)}>
      <div className={styles['cars-search__wrapper']}>
        <input
          className={styles['cars-search__input']}
          type='text'
          placeholder='Search car...'
        />
      </div>
      <div className={styles['cars-filter__options']}>
        <label className={styles['cars-filter__label']}>
          Year From:
          <select
            className={styles['cars-filter__select']}
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
        <label className={styles['cars-filter__label']}>
          Min Price:
          <select
            className={styles['cars-filter__select']}
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
        <label className={styles['cars-filter__label']}>
          Sort by Price:
          <select className={styles['cars-filter__select']}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </label>
      </div>
      <button
        className={styles['reset-filters-btn']}
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};
