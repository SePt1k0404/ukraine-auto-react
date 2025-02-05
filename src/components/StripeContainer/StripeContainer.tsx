import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const StripeContainer = ({ onClose }: { onClose: () => void }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onClose={onClose} />
    </Elements>
  );
};
