export interface IAddNewCarFormInitialValues {
  model: string;
  year: string | number;
  price: string | number;
  milage: string | number;
  brief: string;
  desc: string;
  img: File | undefined | string;
  latitude: number | undefined;
  longitude: number | undefined;
}
