import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarsList, ICarsResponse } from '../carsList.interface';
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
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const getCars = createAsyncThunk<
  ICarsResponse,
  {
    lastVisibleCar: undefined | string;
    previousVisibleCar: undefined | string;
    carsQuery:
      | undefined
      | {
          model: string;
          year: string;
          price: string;
        };
  },
  { rejectValue: string }
>(
  'carsList/getCars',
  async (
    { lastVisibleCar, previousVisibleCar, carsQuery },
    { rejectWithValue },
  ) => {
    try {
      const carsCollectionRef = collection(db, 'cars');
      let carsQueryBase = query(carsCollectionRef);
      if (carsQuery?.model) {
        const startValue = carsQuery.model;
        const endValue = carsQuery.model + '\uf8ff';
        carsQueryBase = query(
          carsQueryBase,
          orderBy('model'),
          where('model', '>=', startValue),
          where('model', '<=', endValue),
        );
      }
      if (carsQuery?.year) {
        carsQueryBase = query(
          carsQueryBase,
          where('year', '==', Number(carsQuery.year)),
        );
      }
      if (carsQuery?.price) {
        carsQueryBase = query(
          carsQueryBase,
          where('price', '>=', Number(carsQuery.price)),
        );
      }

      const countQuery = carsQueryBase;
      const countSnapshot = await getCountFromServer(countQuery);
      const allCarsLength = countSnapshot.data().count;
      if (lastVisibleCar) {
        const lastDocRef = doc(db, 'cars', lastVisibleCar);
        const lastDocData = await getDoc(lastDocRef);
        carsQueryBase = query(carsQueryBase, startAfter(lastDocData));
      }
      if (previousVisibleCar) {
        const prevDocRef = doc(db, 'cars', previousVisibleCar);
        const prevDocData = await getDoc(prevDocRef);
        carsQueryBase = query(carsQueryBase, endBefore(prevDocData));
      }
      carsQueryBase = query(carsQueryBase, limit(9));
      const carsSnapshot = await getDocs(carsQueryBase);
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
        carsListLength: allCarsLength || 0,
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
