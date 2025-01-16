import { createRef, useState } from 'react';
import { ICropperModalProps } from './CropperModal.interface';
import styles from './CropperModal.module.css';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export const CropperModal = ({
  closeModal,
  avatar,
  uploadAvatar,
}: ICropperModalProps) => {
  const [image, _] = useState<File | null>(avatar);
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-avatar.png', {
            type: blob.type,
          });
          uploadAvatar(file);
          setTimeout(() => {
            closeModal();
          }, 500);
        }
      });
    }
  };

  const handleCropperClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles['backdrop']}>
      <div className={styles['wrapper']}>
        <div
          className={styles['cropper-container']}
          onClick={handleCropperClick}
        >
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: '100%' }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview='.img-preview'
            src={URL.createObjectURL(image!)}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <div className={styles['buttons-wrapper']}>
          <button className={styles['cropped-img']} onClick={getCropData}>
            Upload Avatar
          </button>
          <button className={styles['close-modal']} onClick={closeModal}>
            Close Cropper
          </button>
        </div>
      </div>
    </div>
  );
};
