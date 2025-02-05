export interface IUserAuthLogin {
  email: string;
  password: string;
  stripeCustomerId?: string;
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
  stripeCustomerId?: string;
  uid: string | null;
}

export interface IUserPersistentAuth {
  jwt: string | null;
}
