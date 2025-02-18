import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const deleteUserCarAnnounce = createAsyncThunk<
  string[],
  string,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/deleteUserCarAnnounce',
  async (carId, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return rejectWithValue('User document not found');
      }
      const userAnnouncement = userDoc.data().announcement || [];
      await updateDoc(userDocRef, {
        announcement: arrayRemove(carId),
      });
      return userAnnouncement.filter((id: string) => id !== carId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
