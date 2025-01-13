export interface IUserProfile {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface IUserPersistent {
  jwt: string;
}
