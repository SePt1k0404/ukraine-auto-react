import { Dispatch, SetStateAction, useState } from 'react';

export const useModal = (
  closeModal: () => void,
): {
  isClosing: boolean;
  setIsClosing: Dispatch<SetStateAction<boolean>>;
  startClosing: () => void;
  handleBackdropClick: () => void;
  handleFormClick: (e: React.MouseEvent<HTMLFormElement>) => void;
} => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const startClosing = () => {
    setIsClosing(true);
    setTimeout(closeModal, 500);
  };

  const handleBackdropClick = () => {
    startClosing();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };

  return {
    isClosing,
    setIsClosing,
    startClosing,
    handleBackdropClick,
    handleFormClick,
  };
};
