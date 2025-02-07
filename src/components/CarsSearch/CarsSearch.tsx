import clsx from 'clsx';
import {
  ICarsSearchInitialValues,
  ICarsSearchProps,
} from './CarsSearch.interface';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { getCars } from '../../features/carsList/carsListSliceFunctions/getCars';
import { carsListAction } from '../../features/carsList/carsListSlice';
import { CarSearchSchema } from './CarsSearch.schema';
import { getFavoriteCars } from '../../features/carsList/carsListSliceFunctions/getFavoriteCars';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const CarsSearch = ({ className, carsListType }: ICarsSearchProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const favoriteCarsId = useSelector(
    (state: RootState) => state.userProfileReducer.favoritesCars,
  );

  const location = useLocation();

  const [geoLocationError, setGeoLocationError] = useState<string | null>(null);

  const [isFinding, setIsFinding] = useState(false);

  const formik = useFormik<ICarsSearchInitialValues>({
    initialValues: {
      model: '',
      year: '',
      price: '',
      geoLocationCars: false,
      latitude: null,
      longitude: null,
    },
    validationSchema: CarSearchSchema,
    onSubmit: (values) => {
      dispatch(carsListAction.addCarsQuery(values));
      if (carsListType == 'home') {
        dispatch(
          getCars({
            lastVisibleCar: undefined,
            previousVisibleCar: undefined,
            carsQuery: values,
            geoLocationCars: values.geoLocationCars,
            latitude: values.latitude,
            longitude: values.longitude,
          }),
        );
      } else if (carsListType == 'favorite') {
        dispatch(
          getFavoriteCars({
            lastVisibleCar: undefined,
            carsQuery: values,
            favoriteList: favoriteCarsId,
          }),
        );
      }
    },
  });

  const handleToggleFindNearbyCars = () => {
    if (!isFinding) {
      handleFindNearbyCars();
    } else {
      formik.setValues((prev) => ({
        ...prev,
        geoLocationCars: false,
        latitude: null,
        longitude: null,
      }));
    }
    setIsFinding((prev) => !prev);
  };

  const handleFindNearbyCars = () => {
    if (!navigator.geolocation) {
      setGeoLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        formik.setValues((prev) => ({
          ...prev,
          geoLocationCars: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        setGeoLocationError(error.message);
      },
    );
  };

  return (
    <form
      className={clsx(
        'flex flex-col xl:flex-row gap-5 bg-custom-gradient-light p-5 rounded-2xl shadow-lg mb-5',
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
      <div className='flex justify-start items-center gap-5 flex-wrap sm:flex-nowrap'>
        <label className='flex flex-col text-sm font-medium gap-2 w-full sm:w-auto'>
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
        <label className='flex flex-col text-sm font-medium gap-2 w-full sm:w-auto'>
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
      <div className='flex gap-4 sm:gap-5 flex-wrap mt-4 sm:mt-0'>
        <button
          type='submit'
          className='bg-main-color text-white border-solid border-[1px] border-main-color outline-none px-5 py-3 rounded-md cursor-pointer transition-colors ease hover:bg-secondary-color focus:bg-secondary-color duration-300 w-full sm:w-auto'
        >
          Search Cars
        </button>
        {!location.pathname.includes('favoriteCars') && (
          <button
            type='button'
            className={`px-6 py-3 bg-main-color rounded-lg shadow-md transition-all duration-300 w-full sm:w-auto
    ${isFinding ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'}
    text-white focus:ring-4 focus:ring-primary-light active:scale-95`}
            onClick={handleToggleFindNearbyCars}
          >
            {isFinding ? 'Stop Finding' : 'Find Nearby Cars'}
          </button>
        )}
        <button
          type='button'
          className='bg-main-red-color text-white border-solid border-[1px] border-main-red-color outline-none px-5 py-3 rounded-md cursor-pointer transition-colors ease hover:bg-accent-red-color focus:bg-accent-red-color duration-300 w-full sm:w-auto'
          onClick={() => {
            formik.resetForm();
            formik.handleSubmit();
            setIsFinding(false);
            dispatch(carsListAction.clearCarsQuery(formik.initialValues));
          }}
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};
