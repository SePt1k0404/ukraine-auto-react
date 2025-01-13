import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import userAuthReducer from '../features/userAuth/userAuthSlice';

export const store = configureStore({
  reducer: {
    userProfileReducer,
    userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDDispatch = typeof store.dispatch;
