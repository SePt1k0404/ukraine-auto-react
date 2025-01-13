import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const PopUpAuth = () => {
  const { isLoading, error, jwt } = useSelector(
    (state: RootState) => state.userAuthReducer,
  );
  const {
    isLoading: isLoadingProfile,
    error: errorProfile,
    name,
  } = useSelector((state: RootState) => state.userProfileReducer);
  React.useEffect(() => {
    if (isLoading) {
      toast.info('Loading...', { autoClose: 500 });
    }
    if (error) {
      toast.error(`Error: ${error}`, { autoClose: 500 });
    }
    if (jwt) {
      toast.success('Login successful!', { autoClose: 500 });
    }
  }, [isLoading, error, jwt]);
  React.useEffect(() => {
    if (isLoadingProfile) {
      toast.info('Loading...', { autoClose: 500 });
    }
    if (errorProfile) {
      toast.error(`Error: ${errorProfile}`, { autoClose: 500 });
    }
    if (name) {
      toast.success('Get user info successful!', { autoClose: 500 });
    }
  }, [isLoadingProfile, errorProfile, name]);

  return <ToastContainer />;
};

export default PopUpAuth;
