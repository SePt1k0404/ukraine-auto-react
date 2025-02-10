export interface ICar {
  id: string;
  model: string;
  year: number;
  price: number;
  desc: string;
  brief: string;
  likes: number;
  mileage: number;
  seller?: {
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
  };
  sold?: boolean;
  image: string;
}

export interface ICarsList {
  cars: ICar[];
}

export interface ICarsListInitialState {
  cars: ICar[] | [];
  dedicatedCar: null | ICar;
  allCarsLength: number;
  carsComparison: ICar[] | [];
  lastVisibleCar: undefined | string;
  previousVisibleCar: undefined | string;
  carsQuery: {
    model: string;
    year: string;
    price: string;
  };
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
