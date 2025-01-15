export interface IUserProfile {
  name: string;
  phoneNumber: string;
  city: string;
  email: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface IChangeUserProfile {
  name: string;
  phoneNumber: string;
  city: string;
}

export interface IUserPersistent {
  jwt: string;
}

export interface IChangeUserEmail {
  oldEmail: string;
  newEmail: string;
  password: string;
}

export interface IChangeUserPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}
