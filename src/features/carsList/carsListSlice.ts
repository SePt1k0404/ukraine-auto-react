import { initialState } from './carsListSliceInitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar, ICarsResponse } from './carsList.interface';
import { getDedicatedCar } from './carsListSliceFunctions/getDedicatedCar';
import { getCars } from './carsListSliceFunctions/getCars';
import {
  pendingFunction,
  rejectedFunction,
} from './carsListSliceFunctions/carsListStatusFunctions';
import { getFavoriteCars } from './carsListSliceFunctions/getFavoriteCars';
import { soldCar } from './carsListSliceFunctions/soldCar';

const carsListSlice = createSlice({
  name: 'carsList',
  initialState,
  reducers: {
    addCarsQuery: (state, action) => {
      state.carsQuery = { ...action.payload };
    },
    clearCarsQuery: (state, action) => {
      state.carsQuery = { ...action.payload };
    },
    addToComparisonCars: (state, action: PayloadAction<ICar>) => {
      const isChecked = state.carsComparison.find(
        (car) => car.id === action.payload.id,
      );
      if (isChecked) {
        return;
      } else {
        state.carsComparison = [...state.carsComparison, action.payload];
      }
    },
    clearFromComparisonCars: (state, action: PayloadAction<string>) => {
      state.carsComparison = [
        ...state.carsComparison.filter((car) => car.id !== action.payload),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        pendingFunction(state);
        state.lastVisibleCar = undefined;
        state.previousVisibleCar = undefined;
      })
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
      .addCase(getFavoriteCars.pending, (state) => {
        pendingFunction(state);
        state.lastVisibleCar = undefined;
        state.previousVisibleCar = undefined;
      })
      .addCase(
        getFavoriteCars.fulfilled,
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
      .addCase(getFavoriteCars.rejected, (state, action) =>
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
      )
      .addCase(soldCar.pending, (state) => pendingFunction(state))
      .addCase(soldCar.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(soldCar.rejected, (state, action) =>
        rejectedFunction(state, action),
      );
  },
});

export default carsListSlice.reducer;
export const carsListAction = carsListSlice.actions;
