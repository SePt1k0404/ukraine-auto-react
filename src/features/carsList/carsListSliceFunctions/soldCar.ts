import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const soldCar = createAsyncThunk<
  void,
  {
    carId: string;
  },
  { rejectValue: string }
>('carsList/soldCar', async ({ carId }, { rejectWithValue }) => {
  try {
    const dedicatedDocRef = doc(db, 'cars', carId);
    const dedicatedDocData = await getDoc(dedicatedDocRef);

    if (!dedicatedDocData.exists()) {
      return rejectWithValue('Car not found');
    }

    await updateDoc(dedicatedDocRef, { sold: true });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});
