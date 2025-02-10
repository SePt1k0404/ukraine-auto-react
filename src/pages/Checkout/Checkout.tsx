import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import { StripeContainer } from '../../components/StripeContainer/StripeContainer';
import clsx from 'clsx';

export const Checkout = () => {
  const carInfo = useSelector(
    (state: RootState) => state.carsListReducer.dedicatedCar,
  );
  const userInfo = useSelector((state: RootState) => state.userProfileReducer);
  const [showCar, setShowCar] = useState(false);
  const { theme } = userInfo;
  return (
    <div
      className={clsx(
        'min-h-screen py-8 rounded-xl',
        theme ? 'bg-background-light' : 'bg-background-dark',
      )}
    >
      <div
        className={clsx(
          'max-w-4xl mx-auto shadow-lg rounded-lg p-6',
          theme
            ? 'bg-background-card-light text-text-dark'
            : 'bg-background-card-dark text-text-light',
        )}
      >
        <h1
          className={clsx(
            'text-2xl font-bold mb-6',
            theme ? 'text-text-dark' : 'text-text-light',
          )}
        >
          Checkout
        </h1>
        <div className='mb-8'>
          <h2
            className={clsx(
              'text-xl font-semibold mb-4',
              theme ? 'text-secondary-text' : 'text-text-light',
            )}
          >
            Car Details
          </h2>
          <div
            className={clsx(
              'p-4 rounded-lg',
              theme ? 'bg-green-300' : 'bg-green-700',
            )}
          >
            <div className='flex items-center space-x-4'>
              <img
                src={
                  carInfo?.image
                    ? carInfo.image
                    : '/public/car-img-placeholder.jpg'
                }
                alt='Car Image'
                className='w-34 h-24 object-cover rounded-lg'
              />
              <div>
                <h3
                  className={clsx(
                    'text-lg font-medium',
                    theme ? 'text-text-dark' : 'text-text-light',
                  )}
                >
                  {carInfo?.model}
                </h3>
                <p
                  className={clsx(theme ? 'text-text-dark' : 'text-text-light')}
                >
                  Price: $
                  {carInfo?.price.toLocaleString('en-US').replace(/,/g, '.')}
                </p>
                <p
                  className={clsx(theme ? 'text-text-dark' : 'text-text-light')}
                >
                  Specifications: {carInfo?.brief}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-8'>
          <h2
            className={clsx(
              'text-xl font-semibold mb-4',
              theme ? 'text-secondary-text' : 'text-text-light',
            )}
          >
            Buyer Information
          </h2>
          <form className='space-y-4'>
            <div>
              <label
                className={clsx(
                  'block text-sm font-medium',
                  theme ? 'text-secondary-text' : 'text-text-light',
                )}
              >
                Full Name
              </label>
              <input
                type='text'
                defaultValue={userInfo.name}
                className={clsx(
                  'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                  theme ? 'border-gray-300' : 'border-gray-600',
                )}
              />
            </div>
            <div>
              <label
                className={clsx(
                  'block text-sm font-medium',
                  theme ? 'text-secondary-text' : 'text-text-light',
                )}
              >
                Email
              </label>
              <input
                type='email'
                defaultValue={userInfo.email}
                className={clsx(
                  'mt-1 block w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                  theme ? 'border-gray-300' : 'border-gray-600',
                )}
              />
            </div>
            <div>
              <label
                className={clsx(
                  'block text-sm font-medium',
                  theme ? 'text-secondary-text' : 'text-text-light',
                )}
              >
                Phone number:
              </label>
              <input
                type='tel'
                defaultValue={userInfo.phoneNumber}
                className={clsx(
                  'mt-1 block w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                  theme ? 'border-gray-300' : 'border-gray-600',
                )}
              />
            </div>
            <div>
              <label
                className={clsx(
                  'block text-sm font-medium',
                  theme ? 'text-secondary-text' : 'text-text-light',
                )}
              >
                Address
              </label>
              <input
                type='text'
                defaultValue={userInfo.city}
                className={clsx(
                  'mt-1 block w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                  theme ? 'border-gray-300' : 'border-gray-600',
                )}
              />
            </div>
          </form>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => {
              setShowCar((state) => !state);
            }}
            className={clsx(
              'bg-main-color text-white px-6 py-2 rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-blue-500',
            )}
          >
            Complete Purchase
          </button>
        </div>
      </div>
      {showCar && (
        <StripeContainer
          onClose={() => {
            setShowCar((state) => !state);
          }}
        />
      )}
    </div>
  );
};
