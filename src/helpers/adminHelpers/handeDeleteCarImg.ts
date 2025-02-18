import { toast } from 'react-toastify';

export const handleDeleteCarImg = async (imageUrl: string) => {
  const publicId = imageUrl
    .split('/upload/')[1]
    .split('/')
    .slice(1)
    .join('/')
    .split('.')[0]
    .split('?')[0];

  try {
    const response = await fetch('http://localhost:4000/delete-car-img', {
      method: 'POST',
      body: JSON.stringify({ publicId }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.success) {
      toast.success('Image deleted successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Failed to delete image', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    toast.error('Error deleting image', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
