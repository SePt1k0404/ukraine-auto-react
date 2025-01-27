import { PayloadAction } from '@reduxjs/toolkit';
import { ICarsListInitialState } from '../carsList.interface';

export const pendingFunction = (state: ICarsListInitialState): void => {
  state.isLoading = true;
  state.isSuccess = false;
  state.error = null;
};

export const rejectedFunction = (
  state: ICarsListInitialState,
  action: PayloadAction<string | null | undefined>,
): void => {
  state.error = action.payload || 'Unknown error';
  state.cars = [];
  state.allCarsLength = 0;
  state.isLoading = false;
  state.isSuccess = false;
};
