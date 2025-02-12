import { loadTheme } from '../../app/storege';
import { IPersistentTheme, IUserProfile } from './userProfile.interface';

export const THEME_PERSISTENT = 'theme';
const localTheme = loadTheme<IPersistentTheme>(THEME_PERSISTENT)?.theme;

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
  announcement: [],
  isLoading: false,
  isSuccess: false,
  error: null,
  theme: localTheme === undefined ? true : localTheme,
};
