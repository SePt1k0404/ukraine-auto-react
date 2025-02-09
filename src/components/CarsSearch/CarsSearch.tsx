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
import { toast } from 'react-toastify';

export const CarsSearch = ({ className, carsListType }: ICarsSearchProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const favoriteCarsId = useSelector(
    (state: RootState) => state.userProfileReducer.favoritesCars,
  );
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

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
      toast.error(geoLocationError, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        toast.error(geoLocationError, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    );
  };

  return (
    <form
      className={clsx(
        'flex flex-col xl:flex-row gap-5 p-5 rounded-2xl shadow-lg mb-5',
        theme
          ? 'bg-custom-gradient-light text-dark'
          : 'bg-custom-gradient-dark text-light',
        className,
      )}
      onSubmit={formik.handleSubmit}
    >
      <div className='flex justify-start flex-grow mr-5'>
        <input
          className={clsx(
            'w-full py-1 px-4 text-lg border-solid border-[1px] rounded-lg outline-none transition-colors ease duration-300',
            theme
              ? 'bg-background-card-light border-[#e0e0e0] hover:border-main-color focus:border-main-color'
              : 'bg-background-card-dark border-[#34495e] hover:border-main-color-dark focus:border-main-color-dark',
          )}
          type='text'
          id='model'
          placeholder='Search car...'
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className='flex justify-start items-center gap-5 flex-wrap sm:flex-nowrap'>
        <label
          className={clsx(
            'flex flex-col text-sm font-medium gap-2 w-full sm:w-auto',
            theme ? 'text-black' : 'text-white',
          )}
        >
          Year From:
          <select
            className={clsx(
              'px-3 py-2 border-solid border-[1px] outline-none transition-colors ease duration-300',
              theme
                ? 'bg-background-card-light border-gray-400 hover:border-main-color focus:border-main-color'
                : 'bg-background-card-dark border-gray-600 hover:border-main-color-dark focus:border-main-color-dark',
            )}
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
        <label
          className={clsx(
            'flex flex-col text-sm font-medium gap-2 w-full sm:w-auto',
            theme ? 'text-black' : 'text-white',
          )}
        >
          Min Price:
          <select
            className={clsx(
              'px-3 py-2 border-solid border-[1px] outline-none transition-colors ease duration-300',
              theme
                ? 'bg-background-card-light border-gray-400 hover:border-main-color focus:border-main-color'
                : 'bg-background-card-dark border-gray-600 hover:border-main-color-dark focus:border-main-color-dark',
            )}
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
          className={clsx(
            'px-5 py-3 rounded-md cursor-pointer transition-colors ease duration-300 w-full sm:w-auto',
            theme
              ? 'bg-main-color text-white hover:bg-secondary-color focus:bg-secondary-color'
              : 'bg-main-color-dark text-white hover:bg-secondary-color-dark focus:bg-secondary-color-dark',
          )}
        >
          Search Cars
        </button>
        {!location.pathname.includes('favoriteCars') && (
          <button
            type='button'
            className={clsx(
              'px-6 py-3 rounded-lg shadow-md transition-all duration-300 w-full sm:w-auto text-white',
              theme
                ? isFinding
                  ? 'bg-main-red-color hover:bg-accent-red-color focus:ring-2 focus:bg-accent-red-color '
                  : 'bg-main-color hover:bg-primary-dark focus:ring-2 focus:ring-primary-dark '
                : isFinding
                  ? 'bg-main-red-color-dark hover:bg-accent-red-color-dark focus:ring-2 focus:bg-accent-red-color-dark '
                  : 'bg-main-color-dark hover:bg-secondary-color-dark focus:ring-2 focus:bg-secondary-color-dark ',
            )}
            onClick={handleToggleFindNearbyCars}
          >
            {isFinding ? 'Stop Finding' : 'Find Nearby Cars'}
          </button>
        )}
        <button
          type='button'
          className={clsx(
            'px-5 py-3 rounded-md cursor-pointer transition-colors ease duration-300 w-full sm:w-auto',
            theme
              ? 'bg-main-red-color text-white hover:bg-accent-red-color focus:bg-accent-red-color'
              : 'bg-main-red-color-dark text-white hover:bg-accent-red-color-dark focus:bg-accent-red-color-dark',
          )}
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
