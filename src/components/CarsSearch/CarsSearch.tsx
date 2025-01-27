import clsx from 'clsx';
import { ICarsSearchProps } from './CarsSearch.interface';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDDispatch } from '../../app/store';
import { getCars } from '../../features/carsList/carsListSliceFunctions/getCars';
import { carsListAction } from '../../features/carsList/carsListSlice';

export const CarsSearch = ({ className }: ICarsSearchProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const formik = useFormik({
    initialValues: {
      model: '',
      year: '',
      price: '',
    },
    onSubmit: (values) => {
      dispatch(carsListAction.addCarsQuery(values));
      dispatch(
        getCars({
          lastVisibleCar: undefined,
          previousVisibleCar: undefined,
          carsQuery: values,
        }),
      );
    },
  });

  return (
    <form
      className={clsx(
        'flex flex-row gap-5 bg-custom-gradient-light p-5 rounded-2xl shadow-lg mb-5',
        className,
      )}
      onSubmit={formik.handleSubmit}
    >
      <div className='flex justify-start flex-grow mr-5'>
        <input
          className='w-full py-1 px-4 text-lg border-solid border-[1px] border-[#e0e0e0]
          rounded-lg outline-none bg-background-card-light transition-colors ease hover:border-main-color focus:border-main-color duration-300'
          type='text'
          id='model'
          placeholder='Search car...'
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className='flex justify-start items-center gap-5 flex-nowrap'>
        <label className='flex flex-col text-sm font-medium gap-2'>
          Year From:
          <select
            className='px-3 py-2 border-solid border-[1px] border-gray-400 outline-none bg-background-card-light transition-colors ease hover:border-main-color active:border-main-color focus:border-main-color duration-300'
            id='year'
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option key={'all'} value={''}>
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
            id='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option key={'all'} value={''}>
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
      </div>
      <button
        type='submit'
        className='bg-main-color text-white border-solid border-[1px] border-main-color outline-none px-5 py-3 rounded-md cursor-pointer transition-colors ease hover:bg-secondary-color focus:bg-secondary-color duration-300'
      >
        Search Cars
      </button>
      <button
        type='button'
        className='bg-main-red-color text-white border-solid border-[1px] border-main-red-color outline-none px-5 py-3 rounded-md cursor-pointer transition-colors ease hover:bg-accent-red-color focus:bg-accent-red-color duration-300'
        onClick={() => {
          formik.resetForm();
          formik.handleSubmit();
          dispatch(carsListAction.clearCarsQuery(formik.initialValues));
        }}
      >
        Reset Filters
      </button>
    </form>
  );
};
