import Stripe from 'stripe';

export const stripe = new Stripe(import.meta.env.VITE_FIREBASE_API_KEY, {
  apiVersion: '2025-01-27.acacia',
});
