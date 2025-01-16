import { IUserProfile } from './userProfile.interface';

export const initialState: IUserProfile = {
  name: '',
  phoneNumber: '',
  city: '',
  email: '',
  avatar: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};
