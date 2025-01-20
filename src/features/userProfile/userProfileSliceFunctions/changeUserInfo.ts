import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChangeUserProfile } from '../userProfile.interface';
import { AppDDispatch } from '../../../app/store';
import { db } from '../../../firebase/config';
import { getUserId } from '../../getUserId';
import { doc, updateDoc } from 'firebase/firestore';

export const changeUserInfo = createAsyncThunk<
  IChangeUserProfile,
  IChangeUserProfile,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserInfo',
  async (params: IChangeUserProfile, { rejectWithValue, dispatch }) => {
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
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
