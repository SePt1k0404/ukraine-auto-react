import { ICarsListInitialState } from './carsList.interface';

export const initialState: ICarsListInitialState = {
  cars: [],
  dedicatedCar: null,
  allCarsLength: 0,
  carsComparison: [],
  isLoading: false,
  lastVisibleCar: undefined,
  previousVisibleCar: undefined,
  carsQuery: {
    model: '',
    year: '',
    price: '',
  },
  error: null,
  isSuccess: false,
};
