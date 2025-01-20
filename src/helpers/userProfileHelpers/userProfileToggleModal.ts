import { Dispatch, SetStateAction } from 'react';

export const toggleChangeInfoModal = (
  setShowChangeInfoModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowChangeInfoModal((state) => !state);
};

export const toggleChangeEmailModal = (
  setShowChangeEmailModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowChangeEmailModal((state) => !state);
};

export const toggleChangePasswordModal = (
  setShowChangePasswordModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowChangePasswordModal((state) => !state);
};

export const toggleDeleteModal = (
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowDeleteModal((state) => !state);
};

export const toggleCroppedModal = (
  setShowChangeInfoModal: Dispatch<SetStateAction<boolean>>,
): void => {
  setShowChangeInfoModal((state) => !state);
};
