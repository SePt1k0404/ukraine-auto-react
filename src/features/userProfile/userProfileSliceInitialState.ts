import { IUserProfile } from './userProfile.interface';

export const initialState: IUserProfile = {
  name: '',
  phoneNumber: '',
  city: '',
  email: '',
  emailPreferences: {
    newsletters: false,
    promotions: false,
    notifications: false,
  },
  favoritesCars: [],
  privacy: false,
  avatar: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};
