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
    lastVisibleCar: string | undefined;
    previousVisibleCar: string | undefined;
    carsQuery: { model: string; year: string; price: string } | undefined;
    carsListType: 'home' | 'favorite';
    favoriteList: string[] | undefined;
  },
  { rejectValue: string }
>(
  'carsList/getCars',
  async (
    {
      lastVisibleCar,
      previousVisibleCar,
      carsQuery,
      carsListType,
      favoriteList,
    },
    { rejectWithValue },
  ) => {
    try {
      const carsCollectionRef = collection(db, 'cars');
      let carsQueryBase = query(carsCollectionRef);
      if (carsListType === 'home') {
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

        const countSnapshot = await getCountFromServer(carsQueryBase);
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
            id: doc.id,
          })),
        };

        return {
          carsList,
          carsListLength: allCarsLength,
          lastVisibleCar: carsSnapshot.docs[carsSnapshot.docs.length - 1]?.id,
          previousVisibleCar: carsSnapshot.docs[0]?.id,
        };
      }
      if (carsListType === 'favorite' && favoriteList?.length) {
        carsQueryBase = query(
          carsQueryBase,
          where('__name__', 'in', favoriteList),
        );

        const carsSnapshot = await getDocs(carsQueryBase);

        if (carsSnapshot.empty) {
          throw new Error('Cars not found');
        }

        let carsList: ICarsList = {
          cars: carsSnapshot.docs.map((doc) => ({
            model: doc.data()?.model || '',
            year: doc.data()?.year || 0,
            price: doc.data()?.price || 0,
            desc: doc.data()?.desc || '',
            brief: doc.data()?.brief || '',
            likes: doc.data()?.likes || 0,
            mileage: doc.data()?.mileage || 0,
            image: doc.data()?.image || '',
            id: doc.id,
          })),
        };
        if (carsQuery) {
          if (carsQuery.model) {
            carsList.cars = carsList.cars.filter((car) =>
              car.model.toLowerCase().includes(carsQuery.model.toLowerCase()),
            );
          }

          if (carsQuery.year) {
            carsList.cars = carsList.cars.filter(
              (car) => car.year === Number(carsQuery.year),
            );
          }

          if (carsQuery.price) {
            carsList.cars = carsList.cars.filter(
              (car) => car.price >= Number(carsQuery.price),
            );
          }
        }

        const pageSize = 9;
        const startIndex = lastVisibleCar
          ? carsList.cars.findIndex((car) => car.id === lastVisibleCar) + 1
          : 0;

        const paginatedCars = carsList.cars.slice(
          startIndex,
          startIndex + pageSize,
        );

        return {
          carsList: { cars: paginatedCars },
          carsListLength: carsList.cars.length,
          lastVisibleCar: paginatedCars[paginatedCars.length - 1]?.id,
          previousVisibleCar: paginatedCars[0]?.id,
        };
      }

      throw new Error('Invalid carsListType or query parameters');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
    }
  },
);
