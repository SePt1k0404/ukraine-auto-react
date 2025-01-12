import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from './userProfile.interface';

const initialState: IUserProfile = {
  name: 'John Smith',
  email: '',
  password: '123123',
  phoneNumber: 682116561,
  city: 'Lviv',
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    changeUserInfo: (state, action: PayloadAction<IUserProfile>) => {
      state = { ...action.payload };
    },
  },
});

export const { changeUserInfo } = userProfileSlice.actions;
export default userProfileSlice.reducer;
