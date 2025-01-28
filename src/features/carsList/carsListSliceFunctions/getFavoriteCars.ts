import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarsList, ICarsResponse } from '../carsList.interface';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const PAGE_SIZE = 9;

export const getFavoriteCars = createAsyncThunk<
  ICarsResponse,
  {
    lastVisibleCar: string | undefined;
    carsQuery: { model: string; year: string; price: string } | undefined;
    favoriteList: string[] | undefined;
  },
  { rejectValue: string }
>(
  'carsList/getFavoriteCars',
  async ({ favoriteList, lastVisibleCar, carsQuery }, { rejectWithValue }) => {
    try {
      const carsCollectionRef = collection(db, 'cars');
      let carsQueryBase = query(carsCollectionRef);
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
      const startIndex = lastVisibleCar
        ? carsList.cars.findIndex((car) => car.id === lastVisibleCar) + 1
        : 0;

      const paginatedCars = carsList.cars.slice(
        startIndex,
        startIndex + PAGE_SIZE,
      );

      return {
        carsList: { cars: paginatedCars },
        carsListLength: carsList.cars.length,
        lastVisibleCar: paginatedCars[paginatedCars.length - 1]?.id,
        previousVisibleCar: paginatedCars[0]?.id,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
    }
  },
);
