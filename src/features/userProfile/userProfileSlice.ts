import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IChangeUserEmail,
  IChangeUserPassword,
  IChangeUserProfile,
  IUserProfile,
} from './userProfile.interface';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getUid } from '../getUid';
import { userAuthAction } from '../userAuth/userAuthSlice';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { AppDDispatch } from '../../app/store';

const initialState: IUserProfile = {
  name: '',
  phoneNumber: '',
  city: '',
  email: '',
  avatar: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

const getUserId = async (dispatch: AppDDispatch): Promise<string> => {
  try {
    const uid = await getUid();
    if (!uid) {
      dispatch(userAuthAction.clearJwt());
      localStorage.removeItem('userData');
      throw new Error('Uid is missing');
    }
    return uid;
  } catch (error) {
    throw new Error('Failed to retrieve user ID');
  }
};

export const setUserProfileAvatar = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/setUserAvatar',
  async (avatar: string, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        avatar,
      });
      return avatar;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

export const getUserProfileInfo = createAsyncThunk<
  IUserProfile,
  void,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>('userProfile/getUserInfo', async (_, { rejectWithValue, dispatch }) => {
  try {
    const uid = await getUserId(dispatch);
    if (!uid) {
      throw new Error('User ID not found');
    }
    const userDocRef = doc(db, 'users', uid);
    const userDocData = await getDoc(userDocRef);

    if (!userDocData.exists() || !userDocData.data()) {
      throw new Error('User not found');
    }
    const data = userDocData.data();
    const userProfile: IUserProfile = {
      name: data?.name || '',
      email: getAuth().currentUser?.email || '',
      phoneNumber: data?.phoneNumber || '',
      city: data?.city || '',
      avatar: null,
    };

    if (data?.avatar) {
      try {
        const validAvatarUrl = await fetch(data.avatar, { method: 'HEAD' });
        if (
          validAvatarUrl.ok &&
          validAvatarUrl.headers.get('Content-Type')?.startsWith('image')
        ) {
          userProfile.avatar = data.avatar;
        } else {
          userProfile.avatar = null;
        }
      } catch (avatarError) {
        console.warn('Invalid avatar URL:', avatarError);
        userProfile.avatar = null;
      }
    } else {
      userProfile.avatar = null;
    }

    return userProfile;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const changeUserInfo = createAsyncThunk<
  IChangeUserProfile,
  IChangeUserProfile,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserInfo',
  async (params: IChangeUserProfile, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        name: params.name,
        phoneNumber: params.phoneNumber,
        city: params.city,
      });
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

export const changeUserEmail = createAsyncThunk<
  IChangeUserEmail,
  IChangeUserEmail,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserEmail',
  async (params: IChangeUserEmail, { rejectWithValue, dispatch }) => {
    try {
      await getUserId(dispatch);
      const auth = getAuth();
      if (!auth.currentUser) {
        return rejectWithValue('User unauthorized!');
      }
      const credential = EmailAuthProvider.credential(
        params.oldEmail,
        params.password,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, params.newEmail);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      localStorage.removeItem('userData');
      dispatch(userAuthAction.clearJwt());
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

export const changeUserPassword = createAsyncThunk<
  IChangeUserPassword,
  IChangeUserPassword,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/changeUserPassword',
  async (params: IChangeUserPassword, { rejectWithValue, dispatch }) => {
    try {
      await getUserId(dispatch);
      const auth = getAuth();
      if (!auth.currentUser) {
        return rejectWithValue('User unauthorized!');
      }
      const credential = EmailAuthProvider.credential(
        params.email,
        params.oldPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, params.newPassword);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      dispatch(userAuthAction.clearJwt());
      localStorage.removeItem('userData');
      return params;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

const pendingFunction = (state: IUserProfile): void => {
  state.isLoading = true;
  state.error = null;
  state.isSuccess = false;
};

const rejectedFunction = (
  state: IUserProfile,
  action: PayloadAction<string | null | undefined>,
): void => {
  state.error = action.payload || 'Unknown error';
  state.isLoading = false;
  state.isSuccess = false;
};

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
