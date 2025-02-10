import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const sendPasswordReset = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('userProfile/sendPasswordReset', async (email, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    return;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});
