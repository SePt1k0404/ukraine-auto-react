import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  IUserAuth,
  IUserAuthLogin,
  IUserAuthRegister,
  IUserPersistentAuth,
} from './userAuth.interface';
import { auth, db } from '../../firebase/config.ts';
import { doc, setDoc } from 'firebase/firestore';
import { loadJwt } from '../../app/storege.ts';

export const JWT_PERSISTENT = 'userData';

const initialState: IUserAuth = {
  jwt: loadJwt<IUserPersistentAuth>(JWT_PERSISTENT)?.jwt ?? null,
  isLoading: false,
  error: null,
  uid: null,
};

export const login = createAsyncThunk<
  { token: string; uid: string },
  IUserAuthLogin,
  { rejectValue: string }
>('userAuth/login', async (params: IUserAuthLogin, { rejectWithValue }) => {
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
});

export const registration = createAsyncThunk<
  { token: string; uid: string },
  IUserAuthRegister,
  { rejectValue: string }
>(
  'userAuth/registration',
  async (params: IUserAuthRegister, { rejectWithValue }) => {
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password,
      );

      const userDocRef = doc(db, 'users', data.user.uid);
      await setDoc(userDocRef, {
        name: params.name,
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

const pendingFunction = (state: IUserAuth): void => {
  state.isLoading = true;
  state.error = null;
};

const rejectedFunction = (
  state: IUserAuth,
  action: PayloadAction<string | null | undefined>,
): void => {
  state.error = action.payload || 'Unknown error';
  state.isLoading = false;
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    clearJwt: (state) => {
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => pendingFunction(state))
      .addCase(
        login.fulfilled,
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
      .addCase(login.rejected, (state, action) =>
        rejectedFunction(state, action),
      )
      .addCase(registration.pending, (state) => pendingFunction(state))
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
      .addCase(registration.rejected, (state, action) =>
        rejectedFunction(state, action),
      );
  },
});

export default userAuthSlice.reducer;
export const userAuthAction = userAuthSlice.actions;
