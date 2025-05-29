import { createContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = createContext();

export const AppContextProvider = function ({ children }) {
  const value = {
    stripePromise,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
