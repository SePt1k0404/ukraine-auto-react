import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from '../../getUserId';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AppDDispatch } from '../../../app/store';

export const toggleFavoriteCar = createAsyncThunk<
  string[],
  { carId: string },
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/toggleFavoriteCar',
  async ({ carId }, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return rejectWithValue('User document not found');
      }

      const userData = userDoc.data();
      const favoritesCars = userData?.favoritesCars || [];

      let updatedFavorites;

      if (favoritesCars.includes(carId)) {
        await updateDoc(userDocRef, {
          favoritesCars: arrayRemove(carId),
        });
        updatedFavorites = favoritesCars.filter((id: string) => id !== carId);
      } else {
        await updateDoc(userDocRef, {
          favoritesCars: arrayUnion(carId),
        });
        updatedFavorites = [...favoritesCars, carId];
      }
      return updatedFavorites;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
