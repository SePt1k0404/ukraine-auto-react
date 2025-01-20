import { PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '../userProfile.interface';

export const pendingFunction = (state: IUserProfile): void => {
  state.isLoading = true;
  state.error = null;
  state.isSuccess = false;
};

export const rejectedFunction = (
  state: IUserProfile,
  action: PayloadAction<string | null | undefined>,
): void => {
  state.error = action.payload || 'Unknown error';
  state.isLoading = false;
  state.isSuccess = false;
};
