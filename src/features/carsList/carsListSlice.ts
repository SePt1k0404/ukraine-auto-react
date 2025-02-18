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
import { getAdminCarListing } from './carsListSliceFunctions/getAdminCarListing';
import { deleteCarAnnounce } from './carsListSliceFunctions/deleteCarAnnounce';
import { changeSellerInfo } from './carsListSliceFunctions/changeSellerInfo';
import { changeCarInfo } from './carsListSliceFunctions/changeCarInfo';

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
    updateCarInList: (state, action) => {
      const { carId, newCarInfo } = action.payload;
      const index = state.announcementCars.findIndex((car) => car.id === carId);
      if (index !== -1) {
        state.announcementCars[index] = {
          ...state.announcementCars[index],
          ...newCarInfo,
        };
      }
    },
    updateCarLikes: (state, action) => {
      const { carId, newCarLikes } = action.payload;
      const index = state.cars.findIndex((car) => car.id === carId);
      if (index !== -1) {
        state.cars[index].likes = newCarLikes;
      }
      if (state.dedicatedCar) {
        state.dedicatedCar.likes = newCarLikes;
      }
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
      )
      .addCase(getAdminCarListing.pending, (state) => pendingFunction(state))
      .addCase(
        getAdminCarListing.fulfilled,
        (state, action: PayloadAction<ICar[] | []>) => {
          state.announcementCars = action.payload;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(getAdminCarListing.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(deleteCarAnnounce.pending, (state) => {
        pendingFunction(state);
        state.operationWithCarsLoading = true;
        state.operationWithCarsSuccess = false;
      })
      .addCase(deleteCarAnnounce.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
        state.operationWithCarsSuccess = true;
      })
      .addCase(deleteCarAnnounce.rejected, (state, action) => {
        rejectedFunction(state, action);
        state.operationWithCarsSuccess = false;
      })
      .addCase(changeSellerInfo.pending, (state) => pendingFunction(state))
      .addCase(changeSellerInfo.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(changeSellerInfo.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(changeCarInfo.pending, (state) => {
        pendingFunction(state);
        state.operationWithCarsLoading = true;
        state.operationWithCarsSuccess = false;
      })
      .addCase(changeCarInfo.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
        state.operationWithCarsSuccess = true;
      })
      .addCase(changeCarInfo.rejected, (state, action) => {
        rejectedFunction(state, action);
        state.operationWithCarsSuccess = false;
      });
  },
});

export default carsListSlice.reducer;
export const carsListAction = carsListSlice.actions;
