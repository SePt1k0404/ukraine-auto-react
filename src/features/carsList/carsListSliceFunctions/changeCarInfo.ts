import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from '../../getUserId';
import { AppDDispatch } from '../../../app/store';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { IChangeCarInfo } from '../carsList.interface';

export const changeCarInfo = createAsyncThunk<
  void,
  { carId: string; newCarInfo: IChangeCarInfo },
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'carsList/changeCarInfo',
  async ({ carId, newCarInfo }, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      if (!uid) {
        return rejectWithValue('User ID not found');
      }
      const updatedCarRef = doc(db, 'cars', carId);
      await updateDoc(updatedCarRef, {
        ...newCarInfo,
      });
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
