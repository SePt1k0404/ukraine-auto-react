import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarsList, ICarsResponse } from '../carsList.interface';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { mapCarData } from '../../../helpers/favoriteCarsHelpers/mapCarData';

const PAGE_SIZE = 9;

export const getFavoriteCars = createAsyncThunk<
  ICarsResponse,
  {
    lastVisibleCar?: string;
    carsQuery?: { model?: string; year?: string; price?: string };
    favoriteList?: string[];
  },
  { rejectValue: string }
>(
  'carsList/getFavoriteCars',
  async (
    { favoriteList = [], lastVisibleCar, carsQuery = {} },
    { rejectWithValue },
  ) => {
    try {
      if (!favoriteList.length) {
        return rejectWithValue('No favorite cars found.');
      }

      const carsCollectionRef = collection(db, 'cars');
      const carsQueryBase = query(
        carsCollectionRef,
        where('__name__', 'in', favoriteList),
      );
      const carsSnapshot = await getDocs(carsQueryBase);

      if (carsSnapshot.empty) {
        throw new Error('Cars not found');
      }
      let carsList: ICarsList = {
        cars: carsSnapshot.docs.map(mapCarData),
      };

      const { model, year, price } = carsQuery;
      if (model || year || price) {
        carsList.cars = carsList.cars.filter(
          (car) =>
            (!model || car.model.toLowerCase().includes(model.toLowerCase())) &&
            (!year || car.year === Number(year)) &&
            (!price || car.price >= Number(price)),
        );
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
        lastVisibleCar: paginatedCars.at(-1)?.id,
        previousVisibleCar: paginatedCars.at(0)?.id,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
    }
  },
);
