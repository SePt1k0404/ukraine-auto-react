import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDeleteUserProfile } from '../userProfile.interface';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { userAuthAction } from '../../userAuth/userAuthSlice';

export const deleteUserProfile = createAsyncThunk<
  void,
  IDeleteUserProfile,
  {
    rejectValue: string;
    dispatch: AppDDispatch;
  }
>(
  'userProfile/deleteUserProfile',
  async (params: IDeleteUserProfile, { rejectWithValue, dispatch }) => {
    try {
      const uid = await getUserId(dispatch);
      const auth = getAuth();
      if (!auth.currentUser) {
        return rejectWithValue('User unauthorized!');
      }
      const userDocRef = doc(db, 'users', uid);
      const credential = EmailAuthProvider.credential(
        params.email,
        params.password,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteDoc(userDocRef);
      await deleteUser(auth.currentUser);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      dispatch(userAuthAction.clearJwt());
      localStorage.removeItem('userData');
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Wrong password or email');
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
