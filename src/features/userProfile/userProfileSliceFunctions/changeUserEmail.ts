import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChangeUserEmail } from '../userProfile.interface';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import { userAuthAction } from '../../userAuth/userAuthSlice';

export const changeUserEmail = createAsyncThunk<
  IChangeUserEmail,
  IChangeUserEmail,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserEmail',
  async (params: IChangeUserEmail, { rejectWithValue, dispatch }) => {
    try {
      await getUserId(dispatch);
      const auth = getAuth();
      if (!auth.currentUser) {
        return rejectWithValue('User unauthorized!');
      }
      const credential = EmailAuthProvider.credential(
        params.oldEmail,
        params.password,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, params.newEmail);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      localStorage.removeItem('userData');
      dispatch(userAuthAction.clearJwt());
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
