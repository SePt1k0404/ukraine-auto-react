import { getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { PrivateRoutsProps } from './PrivateRouts.interface';

export const PrivateRouts = ({ element }: PrivateRoutsProps) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? element : <Navigate to='/' replace />;
};
