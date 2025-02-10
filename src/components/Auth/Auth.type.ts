import { Dispatch, SetStateAction } from 'react';

export type Props = {
  closeModal: () => void;
  forgotPassword?: Dispatch<SetStateAction<boolean>>;
};
