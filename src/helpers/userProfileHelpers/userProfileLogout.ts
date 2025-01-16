import { AppDDispatch } from '../../app/store';
import { userAuthAction } from '../../features/userAuth/userAuthSlice';

export const handleLogout = (dispatch: AppDDispatch) => {
  dispatch(userAuthAction.clearJwt());
  localStorage.removeItem('userData');
  window.location.href = '/';
};
