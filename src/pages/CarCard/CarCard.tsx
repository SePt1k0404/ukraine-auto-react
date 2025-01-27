import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { getDedicatedCar } from '../../features/carsList/carsListSliceFunctions/getDedicatedCar';
import { useNavigate, useParams } from 'react-router-dom';

export const CarCard = () => {
  const dispatch = useDispatch<AppDDispatch>();
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const { dedicatedCar, isLoading, error, isSuccess } = useSelector(
    (state: RootState) => state.carsListReducer,
  );

  useEffect(() => {
    if (carId) {
      dispatch(getDedicatedCar({ carId }));
    }
  }, [dispatch, carId]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    navigate('/error');
  }

  if (!dedicatedCar || !isSuccess) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500 text-lg'>Car details not available.</p>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
      <div className='relative overflow-hidden rounded-lg group'>
        <img
          src={dedicatedCar.image || '/public/car-img-placeholder.webp'}
          alt={dedicatedCar.model}
          className='w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300'></div>
        <div className='absolute bottom-4 left-4 text-green-500 text-lg font-semibold bg-green-900 px-3 py-1 rounded-lg group-hover:opacity-100 opacity-80 transition-opacity'>
          ${dedicatedCar.price.toLocaleString('en-US').replace(/,/g, '.')}
        </div>
      </div>

      <div className='text-center mt-6'>
        <h1 className='text-3xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300'>
          {dedicatedCar.model} ({dedicatedCar.year})
        </h1>
        <p className='text-gray-600 text-base mt-2 italic'>
          {dedicatedCar.brief || 'No brief description available.'}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-6'>
        <div className='text-left'>
          <p className='text-lg font-medium text-gray-700'>
            Mileage:{' '}
            <span className='font-bold text-gray-900'>
              {dedicatedCar.mileage.toLocaleString('en-US')} km
            </span>
          </p>
          <p className='text-lg font-medium text-gray-700'>
            Likes:{' '}
            <span className='font-bold text-gray-900'>
              {dedicatedCar.likes}
            </span>
          </p>
        </div>
        <div className='text-left'>
          <p className='text-lg font-medium text-gray-700'>
            Price:{' '}
            <span className='font-bold text-green-500'>
              ${dedicatedCar.price.toLocaleString('en-US').replace(/,/g, '.')}
            </span>
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
          Description
        </h2>
        <p className='text-gray-700 mt-4 leading-relaxed'>
          {dedicatedCar.desc || 'No detailed description available.'}
        </p>
      </div>
      <div className='flex justify-center mt-8 gap-4'>
        <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300'>
          Add to Favorites
        </button>
        <button className='px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300'>
          Share
        </button>
      </div>
    </div>
  );
};
