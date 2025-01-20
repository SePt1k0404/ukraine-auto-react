export interface DeleteUserProfileModalProps {
  closeModal: () => void;
  onDelete: () => void;
}

export interface IDeleteUserProfileInitialValues {
  email: string;
  password: string;
}
