export interface IChangeInfoModalProps {
  onCloseModal: () => void;
}

export interface IChangeInfoInitialValues {
  name: string;
  phoneNumber: string;
  city: string;
  emailPreferences: {
    newsletters: boolean;
    promotions: boolean;
    notifications: boolean;
  };
  privacy: boolean;
}
