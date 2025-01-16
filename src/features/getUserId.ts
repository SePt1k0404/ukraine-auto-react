import { AppDDispatch } from '../app/store';
import { getUid } from './getUid';
import { userAuthAction } from './userAuth/userAuthSlice';

export const getUserId = async (dispatch: AppDDispatch): Promise<string> => {
  try {
    const uid = await getUid();
    if (!uid) {
      dispatch(userAuthAction.clearJwt());
      localStorage.removeItem('userData');
      throw new Error('Uid is missing');
    }
    return uid;
  } catch (error) {
    throw new Error('Failed to retrieve user ID');
  }
};
