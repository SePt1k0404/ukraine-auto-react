export interface IChangePasswordInitialValues {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordProps {
  closeModal: () => void;
}
