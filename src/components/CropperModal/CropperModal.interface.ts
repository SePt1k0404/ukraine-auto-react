import { AppDDispatch } from '../../app/store';

export interface ICropperModalProps {
  closeModal: () => void;
  avatar: File | null;
  dispatch: AppDDispatch;
}
