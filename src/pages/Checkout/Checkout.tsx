import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Checkout = () => {
  const carInfo = useSelector(
    (state: RootState) => state.carsListReducer.dedicatedCar,
  );
  const userInfo = useSelector((state: RootState) => state.userProfileReducer);
  return (
    <div className='min-h-screen bg-gray-100 py-8 rounded-xl'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Checkout</h1>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Car Details
          </h2>
          <div className='bg-green-300 p-4 rounded-lg'>
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
                <h3 className='text-lg font-medium text-gray-800'>
                  {carInfo?.model}
                </h3>
                <p className='text-gray-600'>
                  Price: $
                  {carInfo?.price.toLocaleString('en-US').replace(/,/g, '.')}
                </p>
                <p className='text-gray-600'>
                  Specifications: {carInfo?.brief}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Buyer Information
          </h2>
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                defaultValue={userInfo.name}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                defaultValue={userInfo.email}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Phone number:
              </label>
              <input
                type='tel'
                defaultValue={userInfo.phoneNumber}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Address
              </label>
              <input
                type='text'
                defaultValue={userInfo.city}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </form>
        </div>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Payment Method
          </h2>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <input
                type='radio'
                id='stripe'
                name='payment'
                value='stripe'
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
              />
              <label htmlFor='stripe' className='text-gray-700'>
                Pay with Stripe
              </label>
            </div>
            <div className='flex items-center space-x-3'>
              <input
                type='radio'
                id='paypal'
                name='payment'
                value='paypal'
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
              />
              <label htmlFor='paypal' className='text-gray-700'>
                Pay with PayPal
              </label>
            </div>
          </div>
        </div>

        {/* Error markup */}
        {/* <div className='mb-8'>
          <div className='bg-red-50 border-l-4 border-red-400 p-4'>
            <p className='text-sm text-red-700'>
              Payment failed. Please try again.
            </p>
          </div>
        </div> */}
        {/* Error markup */}

        <div className='flex justify-end'>
          <button className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};
