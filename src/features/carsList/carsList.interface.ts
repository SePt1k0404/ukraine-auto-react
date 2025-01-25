export interface ICar {
  id: string;
  model: string;
  year: number;
  price: number;
  desc: string;
  brief: string;
  likes: number;
  mileage: number;
  image: string;
}

export interface ICarsList {
  cars: ICar[];
}

export interface ICarsListInitialState {
  cars: ICar[] | [];
  dedicatedCar: null | ICar;
  allCarsLength: number;
  lastVisibleCar: undefined | string;
  previousVisibleCar: undefined | string;
  isLoading: boolean;
  error: null | string;
  isSuccess: boolean;
}

export interface ICarsResponse {
  carsList: ICarsList;
  carsListLength: number;
  lastVisibleCar: undefined | string;
  previousVisibleCar: undefined | string;
}
