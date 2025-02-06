import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export const handleCheckout = (
  jwt: string | null,
  carId: string | undefined,
  navigate: NavigateFunction,
) => {
  if (!jwt) {
    toast.info('Firstly login/register to proceed with checkout', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  if (carId) {
    navigate(`${location.pathname}/checkout`);
  }
};
