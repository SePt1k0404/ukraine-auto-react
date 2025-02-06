import { Dispatch, MouseEvent, SetStateAction } from 'react';

export const handleToggleModal = (
  e: MouseEvent<HTMLElement>,
  setShowContactSellerModal: Dispatch<SetStateAction<boolean>>,
  setShowTestDriveModal: Dispatch<SetStateAction<boolean>>,
): void => {
  const target = e.target as HTMLElement;
  target.dataset.name === 'seller'
    ? setShowContactSellerModal((state) => !state)
    : setShowTestDriveModal((state) => !state);
};
