import { initialState } from './carsListSliceInitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar, ICarsResponse } from './carsList.interface';
import { getDedicatedCar } from './carsListSliceFunctions/getDedicatedCar';
import { getCars } from './carsListSliceFunctions/getCars';
import {
  pendingFunction,
  rejectedFunction,
} from './carsListSliceFunctions/carsListStatusFunctions';

const carsListSlice = createSlice({
  name: 'carsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => pendingFunction(state))
      .addCase(
        getCars.fulfilled,
        (state, action: PayloadAction<ICarsResponse>) => {
          state.cars = [...action.payload.carsList.cars];
          state.allCarsLength = action.payload.carsListLength;
          state.lastVisibleCar = action.payload.lastVisibleCar;
          state.previousVisibleCar = action.payload.previousVisibleCar;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(getCars.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(getDedicatedCar.pending, (state) => pendingFunction(state))
      .addCase(
        getDedicatedCar.fulfilled,
        (state, action: PayloadAction<ICar>) => {
          state.dedicatedCar = action.payload;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(getDedicatedCar.rejected, (state, action) =>
        rejectedFunction(state, action),
      );
  },
});

export default carsListSlice.reducer;
export const carsListAction = carsListSlice.actions;
