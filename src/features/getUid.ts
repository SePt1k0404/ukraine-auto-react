import { auth } from '../firebase/config';
import { validateToken } from './isTokenValid';

export const getUid = async (): Promise<string | null> => {
  const isTokenValid = await validateToken();
  if (isTokenValid) {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    }
    return null;
  } else {
    return null;
  }
};
