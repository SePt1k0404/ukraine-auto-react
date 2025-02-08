export interface ICarsSearchProps {
  className: string;
  carsListType: 'home' | 'favorite';
}

export interface ICarsSearchInitialValues {
  model: string;
  year: string;
  price: string;
  geoLocationCars: boolean;
  latitude: null | number;
  longitude: null | number;
}
