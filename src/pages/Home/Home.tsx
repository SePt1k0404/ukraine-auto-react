import { useDispatch, useSelector } from 'react-redux';
import { CarCard } from '../../components/CarCard/CarCard';
import { CarsSearch } from '../../components/CarsSearch/CarsSearch';
import { AppDDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';
import { getCars } from '../../features/carsList/carsListSliceFunctions/getCars';
import { ComparisonButton } from '../../components/ComparisonButton/ComparisonButton';
import clsx from 'clsx';

export const Home = () => {
  const dispatch = useDispatch<AppDDispatch>();
  const carsList = useSelector((state: RootState) => state.carsListReducer);
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);
  useEffect(() => {
    dispatch(
      getCars({
        lastVisibleCar: undefined,
        previousVisibleCar: undefined,
        carsQuery: undefined,
        geoLocationCars: false,
        longitude: null,
        latitude: null,
      }),
    );
  }, [dispatch]);
  return (
    <>
      <h1
        className={clsx(
          'animate-fadeIn text-secondary-text text-center font-bold text-4xl uppercase tracking-widest relative mb-7 after:content-[""] after:block after:w-20 after:h-1 after:mt-2 after:mx-auto after:rounded-sm after:bg-gradient-to-r from-main-color to-pink-500',
          theme ? '' : 'text-white',
        )}
      >
        Ukraine auto home page:
      </h1>
      <CarsSearch className='animate-fadeIn' carsListType='home' />
      {carsList.carsComparison.length > 0 && <ComparisonButton />}
      <ul className='animate-fadeInUp grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[500px] gap-6 list-none p-0 my-0 mx-auto max-w-[1200px]'>
        {carsList.cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            model={car.model}
            year={car.year}
            price={car.price}
            image={car.image}
            likes={car.likes}
            sold={car.sold}
            brief={car.brief}
          />
        ))}
      </ul>
      <Pagination limit={9} carsListType='home' />
    </>
  );
};
