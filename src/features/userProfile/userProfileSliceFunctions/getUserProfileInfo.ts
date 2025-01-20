import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserProfile } from '../userProfile.interface';
import { AppDDispatch } from '../../../app/store';
import { getUserId } from '../../getUserId';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
      emailPreferences: data?.emailPreferences || {
        newsletters: false,
        promotions: false,
        notifications: false,
      },
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
