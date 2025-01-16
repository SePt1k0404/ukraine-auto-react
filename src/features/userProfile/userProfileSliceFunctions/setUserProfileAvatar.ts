import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const setUserProfileAvatar = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/setUserAvatar',
  async (avatar: string, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        avatar,
      });
      return avatar;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
