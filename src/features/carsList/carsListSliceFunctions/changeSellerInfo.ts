import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { mapCarData } from '../../../helpers/favoriteCarsHelpers/mapCarData';

export const changeSellerInfo = createAsyncThunk<
  void,
  {
    userAnnounceCars: string[];
    newSellerInfo: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      address?: string;
    };
  },
  { rejectValue: string }
>(
  'carsList/changeSellerInfo',
  async ({ userAnnounceCars, newSellerInfo }, { rejectWithValue }) => {
    try {
      if (!userAnnounceCars.length) {
        return rejectWithValue('No announced cars found.');
      }

      const carsCollectionRef = collection(db, 'cars');
      const carsSearchQuery = query(
        carsCollectionRef,
        where('id', 'in', userAnnounceCars),
      );
      const carsSnapshot = await getDocs(carsSearchQuery);

      if (carsSnapshot.empty) {
        return rejectWithValue('Cars not found.');
      }

      const updatePromises = carsSnapshot.docs.map(async (carDoc) => {
        const carData = mapCarData(carDoc);
        const carRef = doc(db, 'cars', carDoc.id);

        await updateDoc(carRef, {
          seller: { ...carData.seller, ...newSellerInfo },
        });
      });

      await Promise.all(updatePromises);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred.');
    }
  },
);
