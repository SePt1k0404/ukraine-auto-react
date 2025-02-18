export interface IChangeCarInfoFormInitialValues {
  model: string | undefined;
  year: string | number | undefined;
  price: string | number | undefined;
  mileage: string | number | undefined;
  brief: string | undefined;
  desc: string | undefined;
  image: string | undefined;
}

export interface IChangeCarInfoFormProps {
  onClose: () => void;
  carId: string;
}
