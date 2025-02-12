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
import { deleteUserProfile } from './userProfileSliceFunctions/deleterUserProfile';
import { toggleFavoriteCar } from './userProfileSliceFunctions/toggleFavoriteCar';
import { sendPasswordReset } from './userProfileSliceFunctions/forgotPassword';
import { addAnnouncement } from './userProfileSliceFunctions/addAnnouncement';
import { deleteUserCarAnnounce } from './userProfileSliceFunctions/deleteUserCarAnnounce';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setAvatarPath: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = !state.theme;
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
          state.emailPreferences = { ...action.payload.emailPreferences };
          state.favoritesCars = action.payload.favoritesCars;
          state.privacy = action.payload.privacy;
          state.avatar = action.payload.avatar;
          state.announcement = action.payload.announcement;
          state.stripeCustomerId = action.payload.stripeCustomerId;
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
          state.emailPreferences = { ...action.payload.emailPreferences };
          state.privacy = action.payload.privacy;
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
      )
      .addCase(deleteUserProfile.pending, (state) => pendingFunction(state))
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.name = initialState.name;
        state.phoneNumber = initialState.phoneNumber;
        state.city = initialState.city;
        state.emailPreferences = initialState.emailPreferences;
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(deleteUserProfile.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(toggleFavoriteCar.pending, (state) => pendingFunction(state))
      .addCase(
        toggleFavoriteCar.fulfilled,
        (state, action: PayloadAction<Array<string>>) => {
          state.favoritesCars = [...action.payload];
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(toggleFavoriteCar.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(sendPasswordReset.pending, (state) => pendingFunction(state))
      .addCase(sendPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(sendPasswordReset.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(addAnnouncement.pending, (state) => pendingFunction(state))
      .addCase(
        addAnnouncement.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.announcement = action.payload;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(addAnnouncement.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(deleteUserCarAnnounce.pending, (state) => pendingFunction(state))
      .addCase(
        deleteUserCarAnnounce.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.announcement = action.payload;
          state.isLoading = false;
          state.error = null;
          state.isSuccess = true;
        },
      )
      .addCase(deleteUserCarAnnounce.rejected, (state, action) =>
        rejectedFunction(state, action),
      );
  },
});

export const userProfileAction = userProfileSlice.actions;
export default userProfileSlice.reducer;
