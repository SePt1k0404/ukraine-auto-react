import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  IUserAuth,
  IUserAuthLogin,
  IUserAuthRegister,
} from './userAuth.interface';
import { app, db } from '../../firebase/config.ts';
import { doc, setDoc } from 'firebase/firestore';

const initialState: IUserAuth = {
  jwt: null,
  isLoading: false,
  error: null,
  uid: null,
};

export const login = createAsyncThunk(
  'userAuth/login',
  async (params: IUserAuthLogin, { rejectWithValue }) => {
    const auth = getAuth(app);
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password,
      );
      const token = await data.user.getIdToken();
      return { token, uid: data.user.uid };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

export const registration = createAsyncThunk(
  'userAuth/registration',
  async (params: IUserAuthRegister, { rejectWithValue }) => {
    const auth = getAuth(app);
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password,
      );

      const userDocRef = doc(db, 'users', data.user.uid);
      await setDoc(userDocRef, {
        name: params.name,
        email: params.email,
        password: params.password,
        phoneNumber: params.phoneNumber,
        city: params.city,
        uid: data.user.uid,
      });

      const token = await data.user.getIdToken();
      return { token, uid: data.user.uid };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; uid: string } | undefined>,
        ) => {
          console.log('Fetching user profile started');
          if (action.payload !== undefined) {
            state.jwt = action.payload.token;
            state.uid = action.payload.uid;
            state.isLoading = false;
          }
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
          ? (action.payload as string)
          : 'Unknown error';
        state.isLoading = false;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registration.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; uid: string } | undefined>,
        ) => {
          if (action.payload !== undefined) {
            state.jwt = action.payload.token;
            state.uid = action.payload.uid;
            state.isLoading = false;
          }
        },
      )
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload
          ? (action.payload as string)
          : 'Unknown error';
        state.isLoading = false;
      });
  },
});

export default userAuthSlice.reducer;
export const userAuthAction = userAuthSlice.actions;
