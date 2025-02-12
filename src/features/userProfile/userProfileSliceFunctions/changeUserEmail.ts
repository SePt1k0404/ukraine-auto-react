import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChangeUserEmail } from '../userProfile.interface';
import { AppDDispatch, RootState } from '../../../app/store';
import { getUserId } from '../../getUserId';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import { userAuthAction } from '../../userAuth/userAuthSlice';
import { changeSellerInfo } from '../../carsList/carsListSliceFunctions/changeSellerInfo';

export const changeUserEmail = createAsyncThunk<
  IChangeUserEmail,
  IChangeUserEmail,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
    state: RootState;
  }
>(
  'userProfile/changeUserEmail',
  async (params: IChangeUserEmail, { rejectWithValue, dispatch, getState }) => {
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
      const state = getState();
      const userAnnounceCars = state.userProfileReducer.announcement || [];
      dispatch(
        changeSellerInfo({
          userAnnounceCars,
          newSellerInfo: {
            email: params.newEmail,
          },
        }),
      );
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
