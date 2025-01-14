import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from './userProfile.interface';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { getUid } from '../getUid';
import { userAuthAction } from '../userAuth/userAuthSlice';

const initialState: IUserProfile = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  city: '',
  isLoading: false,
  error: null,
};

export const getUserProfileInfo = createAsyncThunk(
  'userProfile/getUserInfo',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUid();
      if (!uid) {
        dispatch(userAuthAction.clearJwt());
        localStorage.removeItem('userData');
        throw new Error('Uid is missing');
      }
      const userDocRef = doc(db, 'users', uid);
      const userDocData = await getDoc(userDocRef);

      if (!userDocData.exists()) {
        throw new Error('User not found');
      }

      const userProfile: IUserProfile = {
        name: userDocData.data()?.name || '',
        email: userDocData.data()?.email || '',
        password: userDocData.data()?.password || '',
        phoneNumber: userDocData.data()?.phoneNumber || '',
        city: userDocData.data()?.city || '',
      };
      return userProfile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getUserProfileInfo.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.password = action.payload.password;
          state.phoneNumber = action.payload.phoneNumber;
          state.city = action.payload.city;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(getUserProfileInfo.rejected, (state, action) => {
        state.error = action.payload
          ? (action.payload as string)
          : 'Unknown error';
        state.isLoading = false;
      });
  },
});

export const userProfileAction = userProfileSlice.actions;
export default userProfileSlice.reducer;
