import { toast } from 'react-toastify';
import { sendPasswordReset } from '../../features/userProfile/userProfileSliceFunctions/forgotPassword';
import { AppDDispatch } from '../../app/store';

export const forgotPasswordHandler = (
  email: string,
  dispatch: AppDDispatch,
) => {
  toast.info(`Reset password email was sended on ${email}`, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  dispatch(sendPasswordReset(email));
};
