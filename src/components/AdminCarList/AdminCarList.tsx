import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { getAdminCarListing } from '../../features/carsList/carsListSliceFunctions/getAdminCarListing';
import { AdminCarCard } from '../AdminCarCard/AdminCarCard';

export const AdminCarList = () => {
  const { announcement } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const { announcementCars } = useSelector(
    (state: RootState) => state.carsListReducer,
  );
  const dispatch = useDispatch<AppDDispatch>();
  useEffect(() => {
    dispatch(getAdminCarListing(announcement));
  }, [announcement]);

  return (
    <ul className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[500px] gap-6 list-none p-0 my-0 mx-auto max-w-[1200px]'>
      {announcementCars.map((car) => (
        <AdminCarCard
          key={car.id}
          id={car.id}
          model={car.model}
          year={car.year}
          price={car.price}
          image={car.image}
          likes={car.likes}
          sold={car.sold ?? false}
          brief={car.brief}
        />
      ))}
    </ul>
  );
};
