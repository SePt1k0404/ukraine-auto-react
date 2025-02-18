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
  location?: { lat: number; long: number } | null;
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
  announcementCars: ICar[] | [];
  isLoading: boolean;
  error: null | string;
  isSuccess: boolean;
  operationWithCarsLoading: boolean;
  operationWithCarsSuccess: boolean;
}

export interface ICarsResponse {
  carsList: ICarsList;
  carsListLength: number;
  lastVisibleCar: undefined | string;
  previousVisibleCar: undefined | string;
}

export interface IChangeCarInfo {
  model?: string;
  year?: string | number;
  price?: string | number;
  mileage?: string | number;
  brief?: string;
  desc?: string;
  image?: string;
}
