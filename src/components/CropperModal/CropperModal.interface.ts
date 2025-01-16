export interface ICropperModalProps {
  closeModal: () => void;
  avatar: File | null;
  uploadAvatar: (avatar: File) => void;
}
