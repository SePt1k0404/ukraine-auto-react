import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleAdminCarImgChange = (
  e: ChangeEvent<HTMLInputElement>,
  setCarImg: Dispatch<SetStateAction<File | null>>,
  setCarImgPreview: Dispatch<SetStateAction<string | null>>,
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setCarImg(file);
    const imageUrl = URL.createObjectURL(file);
    setCarImgPreview(imageUrl);
    e.target.value = '';
  }
};
