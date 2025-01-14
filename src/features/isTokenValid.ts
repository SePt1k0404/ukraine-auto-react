import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const validateToken = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const expirationDate = new Date(
            idTokenResult.expirationTime,
          ).getTime();
          const currentTime = Date.now();

          if (currentTime < expirationDate) {
            resolve(true);
          } else {
            window.location.href = '/';
            resolve(false);
          }
        } catch (error) {
          reject(false);
        }
      } else {
        resolve(false);
      }
      unsubscribe();
    });
  });
};
