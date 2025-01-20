import { RefObject } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { handleUploadAvatar } from '../userProfileHelpers/userProfileAvatarUploader';
import { AppDDispatch } from '../../app/store';

export const getCropData = (
  cropperRef: RefObject<ReactCropperElement>,
  dispatch: AppDDispatch,
  closeModal: () => void,
) => {
  if (cropperRef.current?.cropper) {
    const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-avatar.png', {
          type: blob.type,
        });
        handleUploadAvatar(file, dispatch);
        setTimeout(() => {
          closeModal();
        }, 500);
      }
    });
  }
};
