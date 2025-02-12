import { getUid } from '../../features/getUid';
const CLOUD_NAME = 'dkftturzq';
const UPLOAD_PRESENT = 'ukraine-auto-cars';

export const handleUploadCarImg = async (file: File) => {
  const uid = await getUid();
  if (uid) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESENT);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        return imageUrl;
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (error) {
      throw new Error('An error occurred while uploading the image.');
    }
  }
};
