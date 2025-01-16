import { initialState } from './userProfileSliceInitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IChangeUserEmail,
  IChangeUserProfile,
  IUserProfile,
} from './userProfile.interface';
import { setUserProfileAvatar } from './userProfileSliceFunctions/setUserProfileAvatar';
import { getUserProfileInfo } from './userProfileSliceFunctions/getUserProfileInfo';
import { changeUserInfo } from './userProfileSliceFunctions/changeUserInfo';
import { changeUserEmail } from './userProfileSliceFunctions/changeUserEmail';
import { changeUserPassword } from './userProfileSliceFunctions/changeUserPassword';
import {
  pendingFunction,
  rejectedFunction,
} from './userProfileSliceFunctions/userProfileStatusFunction';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setAvatarPath: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileInfo.pending, (state) => pendingFunction(state))
      .addCase(
        getUserProfileInfo.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.phoneNumber = action.payload.phoneNumber;
          state.city = action.payload.city;
          state.avatar = action.payload.avatar;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(getUserProfileInfo.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(changeUserInfo.pending, (state) => pendingFunction(state))
      .addCase(
        changeUserInfo.fulfilled,
        (state, action: PayloadAction<IChangeUserProfile>) => {
          state.name = action.payload.name;
          state.phoneNumber = action.payload.phoneNumber;
          state.city = action.payload.city;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(changeUserInfo.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(setUserProfileAvatar.pending, (state) => pendingFunction(state))
      .addCase(
        setUserProfileAvatar.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.avatar = action.payload;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(setUserProfileAvatar.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(changeUserEmail.pending, (state) => pendingFunction(state))
      .addCase(
        changeUserEmail.fulfilled,
        (state, action: PayloadAction<IChangeUserEmail>) => {
          state.email = action.payload.newEmail;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(changeUserEmail.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(changeUserPassword.pending, (state) => pendingFunction(state))
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(changeUserPassword.rejected, (state, action) =>
        rejectedFunction(state, action),
      );
  },
});

export const userProfileAction = userProfileSlice.actions;
export default userProfileSlice.reducer;
