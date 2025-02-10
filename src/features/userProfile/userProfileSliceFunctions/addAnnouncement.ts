import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from '../../getUserId';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AppDDispatch } from '../../../app/store';

export const addAnnouncement = createAsyncThunk<
  void,
  string,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>('userProfile/addAnnouncement', async (id, { rejectWithValue, dispatch }) => {
  try {
    const uid = await getUserId(dispatch);
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      announcement: arrayUnion(id),
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});
