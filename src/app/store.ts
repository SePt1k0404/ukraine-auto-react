import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import userAuthReducer, {
  JWT_PERSISTENT,
} from '../features/userAuth/userAuthSlice';
import { saveJwt } from './storege';

export const store = configureStore({
  reducer: {
    userProfileReducer,
    userAuthReducer,
  },
});

store.subscribe(() => {
  saveJwt({ jwt: store.getState().userAuthReducer.jwt }, JWT_PERSISTENT);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDDispatch = typeof store.dispatch;
