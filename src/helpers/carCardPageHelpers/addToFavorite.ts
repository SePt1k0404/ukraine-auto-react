import { toast } from 'react-toastify';
import { AppDDispatch } from '../../app/store';
import { toggleFavoriteCar } from '../../features/userProfile/userProfileSliceFunctions/toggleFavoriteCar';

export const handleAddToFavorites = (
  jwt: string | null,
  carId: string | undefined,
  dispatch: AppDDispatch,
) => {
  if (!jwt) {
    toast.info('Firstly login/register to add car to favorites', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (carId) {
    dispatch(toggleFavoriteCar({ carId }));
  }
};
