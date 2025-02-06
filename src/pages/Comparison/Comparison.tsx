import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { ICar } from '../../features/carsList/carsList.interface';
import { carsListAction } from '../../features/carsList/carsListSlice';

export const Comparison = () => {
  const { carsComparison } = useSelector(
    (state: RootState) => state.carsListReducer,
  );
  const limitedCars = carsComparison.slice(0, 3);

  const dispatch = useDispatch<AppDDispatch>();

  return (
    <div className='p-6 space-y-6 bg-gray-50 rounded-lg'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
        Car Comparison
      </h2>
      {limitedCars.length === 0 ? (
        <p className='text-center text-gray-600'>No cars to compare.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {limitedCars.map((car: ICar) => (
            <div
              key={car.id}
              className='border flex flex-col border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden'
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
              <div className='p-6 space-y-4 bg-white flex flex-col flex-grow justify-between'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {car.model}
                </h3>
                <p className='text-sm text-gray-500'>
                  {car.year} | ${car.price}
                </p>
                <p className='text-gray-700'>{car.brief}</p>

                <div className='mt-4 space-y-2 text-gray-600 flex flex-col'>
                  <div className='flex justify-between'>
                    <span>Mileage:</span>
                    <span className='font-medium'>{car.mileage} km</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Likes:</span>
                    <span className='font-medium'>{car.likes}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Status:</span>
                    <span
                      className={`font-medium ${
                        car.sold ? 'text-red-500' : 'text-green-500'
                      }`}
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
