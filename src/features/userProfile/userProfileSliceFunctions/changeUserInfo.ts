import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChangeUserProfile } from '../userProfile.interface';
import { AppDDispatch, RootState } from '../../../app/store';
import { db } from '../../../firebase/config';
import { getUserId } from '../../getUserId';
import { doc, updateDoc } from 'firebase/firestore';
import { changeSellerInfo } from '../../carsList/carsListSliceFunctions/changeSellerInfo';

export const changeUserInfo = createAsyncThunk<
  IChangeUserProfile,
  IChangeUserProfile,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
    state: RootState;
  }
>(
  'userProfile/changeUserInfo',
  async (
    params: IChangeUserProfile,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        name: params.name,
        phoneNumber: params.phoneNumber,
        city: params.city,
        emailPreferences: params.emailPreferences,
        privacy: params.privacy,
      });
      const state = getState();
      const userAnnounceCars = state.userProfileReducer.announcement || [];
      dispatch(
        changeSellerInfo({
          userAnnounceCars,
          newSellerInfo: {
            name: params.name,
            phoneNumber: params.phoneNumber,
            address: params.city,
          },
        }),
      );
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
