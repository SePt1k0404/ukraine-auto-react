import { AppDDispatch } from './../../app/store';
import { ICar } from '../../features/carsList/carsList.interface';
import { carsListAction } from '../../features/carsList/carsListSlice';

export const handleComparisonCar = (
  dedicatedCar: ICar | undefined,
  isChecked: ICar | undefined,
  dispatch: AppDDispatch,
) => {
  if (!dedicatedCar) return;
  if (!isChecked) {
    dispatch(carsListAction.addToComparisonCars(dedicatedCar));
  } else {
    dispatch(carsListAction.clearFromComparisonCars(dedicatedCar.id));
  }
};
