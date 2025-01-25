import { ICarsListInitialState } from './carsList.interface';

export const initialState: ICarsListInitialState = {
  cars: [],
  dedicatedCar: null,
  allCarsLength: 0,
  isLoading: false,
  lastVisibleCar: undefined,
  previousVisibleCar: undefined,
  error: null,
  isSuccess: false,
};
