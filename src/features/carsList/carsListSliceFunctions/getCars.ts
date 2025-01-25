import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarsList, ICarsResponse } from '../carsList.interface';
import { db } from '../../../firebase/config';
import {
  collection,
  doc,
  endBefore,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

export const getCars = createAsyncThunk<
  ICarsResponse,
  {
    lastVisibleCar: undefined | string;
    previousVisibleCar: undefined | string;
  },
  { rejectValue: string }
>(
  'carsList/getCars',
  async ({ lastVisibleCar, previousVisibleCar }, { rejectWithValue }) => {
    try {
      const carsCollectionRef = collection(db, 'cars');
      const allCarsLength = await getCountFromServer(carsCollectionRef);
      let carsQuery = query(
        carsCollectionRef,
        orderBy('model', 'desc'),
        limit(9),
      );

      if (lastVisibleCar) {
        const lastDocRef = doc(db, 'cars', lastVisibleCar);
        const lastDocData = await getDoc(lastDocRef);
        carsQuery = query(carsQuery, startAfter(lastDocData));
      }

      if (previousVisibleCar) {
        const prevDocRef = doc(db, 'cars', previousVisibleCar);
        const prevDocData = await getDoc(prevDocRef);
        carsQuery = query(carsQuery, endBefore(prevDocData));
      }

      const carsSnapshot = await getDocs(carsQuery);

      if (carsSnapshot.empty) {
        throw new Error('Cars not found');
      }

      const lastCar = carsSnapshot.docs[carsSnapshot.docs.length - 1];
      const prevCar = carsSnapshot.docs[0];

      const carsList: ICarsList = {
        cars: carsSnapshot.docs.map((doc) => ({
          model: doc.data()?.model || '',
          year: doc.data()?.year || 0,
          price: doc.data()?.price || 0,
          desc: doc.data()?.desc || '',
          brief: doc.data()?.brief || '',
          likes: doc.data()?.likes || 0,
          mileage: doc.data()?.mileage || 0,
          image: doc.data()?.image || '',
          id: doc.id || '',
        })),
      };
      return {
        carsList,
        carsListLength: allCarsLength.data()?.count || 0,
        lastVisibleCar: lastCar.id,
        previousVisibleCar: prevCar.id,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
