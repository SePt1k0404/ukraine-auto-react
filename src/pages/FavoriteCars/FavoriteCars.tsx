import { useEffect } from 'react';
import { CarsSearch } from '../../components/CarsSearch/CarsSearch';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { Pagination } from '../../components/Pagination/Pagination';
import { CarCard } from '../../components/CarCard/CarCard';
import { getFavoriteCars } from '../../features/carsList/carsListSliceFunctions/getFavoriteCars';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export const FavoriteCars = () => {
  const dispatch = useDispatch<AppDDispatch>();
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);
  const navigate = useNavigate();
  const carsList = useSelector(
    (state: RootState) => state.carsListReducer.cars,
  );
  const { favoritesCars, theme } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );

  useEffect(() => {
    if (!jwt) {
      navigate('/');
    }
  }, [jwt]);

  useEffect(() => {
    if (favoritesCars.length) {
      dispatch(
        getFavoriteCars({
          lastVisibleCar: undefined,
          carsQuery: undefined,
          favoriteList: favoritesCars,
        }),
      );
    }
  }, [dispatch, favoritesCars]);
  return (
    <>
      <h1
        className={clsx(
          'animate-fadeIn text-secondary-text text-center font-bold text-4xl uppercase tracking-widest relative mb-7 after:content-[""] after:block after:w-20 after:h-1 after:mt-2 after:mx-auto after:rounded-sm after:bg-gradient-to-r from-main-color to-pink-500',
          theme ? '' : 'text-white',
        )}
      >
        Favorite cars page:
      </h1>
      <CarsSearch className='animate-fadeIn' carsListType='favorite' />
      <ul className='animate-fadeInUp grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[500px] gap-6 list-none p-0 my-0 mx-auto max-w-[1200px]'>
        {carsList.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            model={car.model}
            year={car.year}
            price={car.price}
            image={car.image}
            likes={car.likes}
            brief={car.brief}
            sold={car.sold ?? false}
          />
        ))}
      </ul>
      <Pagination limit={9} carsListType='favorite' />
    </>
  );
};
