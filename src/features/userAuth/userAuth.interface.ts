export interface IUserAuthLogin {
  email: string;
  password: string;
}

export interface IUserAuthRegister {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
}

export interface IUserAuth {
  jwt: string | null;
  isLoading: boolean;
  error: string | null;
  uid: string | null;
}
