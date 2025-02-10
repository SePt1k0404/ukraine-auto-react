import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { ICar } from '../../features/carsList/carsList.interface';
import { carsListAction } from '../../features/carsList/carsListSlice';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Comparison = () => {
  const { carsComparison } = useSelector(
    (state: RootState) => state.carsListReducer,
  );
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);
  const limitedCars = carsComparison.slice(0, 3);

  const dispatch = useDispatch<AppDDispatch>();

  useEffect(() => {
    if (limitedCars.length === 0) {
      navigate('/', { replace: true });
    }
  }, [limitedCars]);

  return (
    <div
      className={clsx(
        'p-6 space-y-6 rounded-lg',
        theme ? 'bg-background-light' : 'bg-background-dark',
        !limitedCars.length && 'min-h-screen',
      )}
    >
      <h2
        className={clsx(
          'text-3xl font-bold text-center mb-8',
          theme ? 'text-secondary-text' : 'text-text-light',
        )}
      >
        Car Comparison
      </h2>
      {limitedCars.length === 0 ? (
        <p
          className={clsx(
            'text-center',
            theme ? 'text-text-dark' : 'text-text-light',
          )}
        >
          No cars to compare.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {limitedCars.map((car: ICar) => (
            <div
              key={car.id}
              className={clsx(
                'border flex flex-col border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden',
                theme ? 'bg-background-card-light' : 'bg-background-card-dark',
              )}
            >
              <div className='relative w-full h-64'>
                <img
                  src={car.image}
                  alt={car.model}
                  className='w-full h-full object-cover rounded-t-xl'
                />
                {car.sold && (
                  <div className='absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg'>
                    Sold
                  </div>
                )}
              </div>
              <div
                className={clsx(
                  'p-6 space-y-4 flex flex-col flex-grow justify-between',
                  theme ? 'bg-white' : 'bg-background-card-dark',
                )}
              >
                <h3
                  className={clsx(
                    'text-xl font-semibold',
                    theme ? 'text-text-dark' : 'text-text-light',
                  )}
                >
                  {car.model}
                </h3>
                <p
                  className={clsx(
                    'text-sm',
                    theme ? 'text-text-dark' : 'text-text-light',
                  )}
                >
                  {car.year} | ${car.price}
                </p>
                <p
                  className={clsx(theme ? 'text-text-dark' : 'text-text-light')}
                >
                  {car.brief}
                </p>

                <div className='mt-4 space-y-2 text-gray-600 flex flex-col'>
                  <div
                    className={clsx(
                      'flex justify-between',
                      theme ? 'text-text-dark' : 'text-text-light',
                    )}
                  >
                    <span>Mileage:</span>
                    <span className='font-medium'>{car.mileage} km</span>
                  </div>
                  <div
                    className={clsx(
                      'flex justify-between',
                      theme ? 'text-text-dark' : 'text-text-light',
                    )}
                  >
                    <span>Likes:</span>
                    <span className='font-medium'>{car.likes}</span>
                  </div>
                  <div
                    className={clsx(
                      'flex justify-between',
                      theme ? 'text-text-dark' : 'text-text-light',
                    )}
                  >
                    <span>Status:</span>
                    <span
                      className={clsx(
                        'font-medium',
                        car.sold ? 'text-red-500' : 'text-green-500',
                      )}
                    >
                      {car.sold ? 'Sold' : 'Available'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(carsListAction.clearFromComparisonCars(car.id));
                    }}
                    className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
