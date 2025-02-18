import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AppDDispatch } from '../../../app/store';
import { deleteUserCarAnnounce } from '../../userProfile/userProfileSliceFunctions/deleteUserCarAnnounce';

export const deleteCarAnnounce = createAsyncThunk<
  void,
  string,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'carsList/deleteCarAnnounce',
  async (carId, { rejectWithValue, dispatch }) => {
    try {
      const dedicatedDocRef = doc(db, 'cars', carId);
      const dedicatedDocData = await getDoc(dedicatedDocRef);

      if (!dedicatedDocData.exists()) {
        return rejectWithValue('Car not found');
      }
      await deleteDoc(dedicatedDocRef);
      dispatch(deleteUserCarAnnounce(carId));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
    }
  },
);
