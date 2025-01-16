import { Dispatch, MouseEvent, SetStateAction } from 'react';

export const handleShowModal = (
  e: MouseEvent<HTMLButtonElement>,
  setShowLoginModal: Dispatch<SetStateAction<boolean>>,
  setShowRegisterModal: Dispatch<SetStateAction<boolean>>,
): void => {
  const target = e.target as HTMLButtonElement;
  target.dataset.name == 'login'
    ? setShowLoginModal(true)
    : setShowRegisterModal(true);
};

export const handleCloseRegisterModal = (
  setShowRegisterModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowRegisterModal(false);
};

export const handleCloseLoginModal = (
  setShowLoginModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowLoginModal(false);
};
