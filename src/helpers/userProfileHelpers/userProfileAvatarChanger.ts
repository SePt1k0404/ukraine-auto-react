import { Dispatch, SetStateAction } from 'react';

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUserAvatar: Dispatch<SetStateAction<File | null>>,
  setShowCroppedModal: Dispatch<SetStateAction<boolean>>,
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setUserAvatar(file);
    setShowCroppedModal(true);
    e.target.value = '';
  }
};
