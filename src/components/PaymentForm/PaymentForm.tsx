import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { soldCar } from '../../features/carsList/carsListSliceFunctions/soldCar';

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#ffffff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm({ onClose }: { onClose: () => void }) {
  const car = useSelector(
    (state: RootState) => state.carsListReducer.dedicatedCar,
  );
  const { name, email, stripeCustomerId } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const [success, setSuccess] = useState<boolean>(false);
  const stripe = useStripe();
  const dispatch = useDispatch<AppDDispatch>();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !car) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error && paymentMethod) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: car?.price && car.price * 100,
          id,
          email,
          name,
          model: car.model,
          stripeCustomerId,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
          dispatch(soldCar({ carId: car?.id }));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error?.message);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-400 hover:text-white'
        >
          ✕
        </button>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <h2 className='text-2xl font-semibold text-center mb-4 text-white'>
              Complete Your Payment
            </h2>
            <fieldset className='border border-gray-600 p-4 rounded-md'>
              <div className='mb-4'>
                <CardElement
                  options={CARD_OPTIONS}
                  className='p-2 bg-gray-700 rounded-md'
                />
              </div>
            </fieldset>
            <button
              type='submit'
              className='w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md text-white font-semibold disabled:bg-gray-500'
              disabled={!stripe}
            >
              Pay Now
            </button>
          </form>
        ) : (
          <div className='text-center text-white'>
            <h2 className='text-2xl font-semibold text-green-400'>
              Payment Successful!
            </h2>
            <p className='mt-2 text-gray-300'>Thank you for your purchase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
