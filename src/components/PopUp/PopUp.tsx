import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PopUpAuth = () => {
  const { isLoading, error, jwt } = useSelector(
    (state: RootState) => state.userAuthReducer,
  );
  const {
    isLoading: isLoadingProfile,
    error: errorProfile,
    isSuccess,
  } = useSelector((state: RootState) => state.userProfileReducer);
  const {
    operationWithCarsLoading,
    error: carsError,
    operationWithCarsSuccess,
  } = useSelector((state: RootState) => state.carsListReducer);
  useEffect(() => {
    if (isLoading) {
      toast.info('Loading...', { autoClose: 500 });
    }
    if (error) {
      toast.error(`Error: ${error}`, { autoClose: 2000 });
    }
    if (jwt) {
      toast.success('Login successful!', { autoClose: 500 });
    }
  }, [isLoading, error, jwt]);
  useEffect(() => {
    if (isLoadingProfile) {
      toast.info('Loading...', { autoClose: 500 });
    }
    if (errorProfile) {
      toast.error(`Error: ${errorProfile}`, { autoClose: 2000 });
    }
    if (isSuccess) {
      toast.success('Operation is successful!', { autoClose: 1500 });
    }
  }, [isLoadingProfile, errorProfile, isSuccess]);
  useEffect(() => {
    if (operationWithCarsLoading) {
      toast.info('Loading...', { autoClose: 500 });
    }
    if (carsError) {
      toast.error(`Error: ${carsError}`, { autoClose: 2000 });
    }
    if (operationWithCarsSuccess) {
      toast.success('Operation with cars is successful!', { autoClose: 1500 });
    }
  }, [operationWithCarsLoading, carsError, operationWithCarsSuccess]);
  return <ToastContainer />;
};

export default PopUpAuth;
