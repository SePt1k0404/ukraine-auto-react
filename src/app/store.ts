import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';

export const store = configureStore({
  reducer: {
    userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDDispatch = typeof store.dispatch;
