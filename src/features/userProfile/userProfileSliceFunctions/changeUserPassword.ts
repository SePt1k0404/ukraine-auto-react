import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChangeUserPassword } from '../userProfile.interface';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { userAuthAction } from '../../userAuth/userAuthSlice';

export const changeUserPassword = createAsyncThunk<
  IChangeUserPassword,
  IChangeUserPassword,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserPassword',
  async (params: IChangeUserPassword, { rejectWithValue, dispatch }) => {
    try {
      await getUserId(dispatch);
      const auth = getAuth();
      if (!auth.currentUser) {
        return rejectWithValue('User unauthorized!');
      }
      const credential = EmailAuthProvider.credential(
        params.email,
        params.oldPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, params.newPassword);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      dispatch(userAuthAction.clearJwt());
      localStorage.removeItem('userData');
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
