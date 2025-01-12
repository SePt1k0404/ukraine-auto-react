export interface IUserProfile {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  city: string;
}

export interface IUserPersistent {
  jwt: string;
}
