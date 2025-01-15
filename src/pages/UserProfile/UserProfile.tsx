import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import styles from './UserProfile.module.css';
import {
  FaEnvelope,
  FaPhone,
  FaCity,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getUserProfileInfo } from '../../features/userProfile/userProfileSlice';
import { userAuthAction } from '../../features/userAuth/userAuthSlice';
import { createPortal } from 'react-dom';
import { ChangeInfoForm } from '../../components/ChangeInfoForm/ChangeInfoForm';
import clsx from 'clsx';
import { ChangeEmailForm } from '../../components/ChangeEmailForm/ChangeEmailForm';
import { ChangePasswordForm } from '../../components/ChangePasswordForm/ChangePasswordForm';

export const UserProfile = () => {
  const { name, phoneNumber, email, city } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );

  const [showChangeInfoModal, setShowChangeInfoModal] =
    useState<boolean>(false);
  const [showChangeEmailModal, setShowChangeEmailModal] =
    useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDDispatch>();

  useEffect(() => {
    if (!name || !email || !phoneNumber || !city) {
      dispatch(getUserProfileInfo());
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(userAuthAction.clearJwt());
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const toggleChangeInfoModal = (): void => {
    setShowChangeInfoModal((state) => !state);
  };

  const toggleChangeEmailModal = (): void => {
    setShowChangeEmailModal((state) => !state);
  };

  const toggleChangePasswordModal = (): void => {
    setShowChangePasswordModal((state) => !state);
  };

  return (
    <div className={styles['user-profile-card']}>
      <button className={styles['logout-button']} onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
      <div className={styles['user-profile-avatar']}>
        <img src='/public/default-avatar.jpg' alt={`${name}'s avatar`} />
      </div>
      <h1 className={styles['user-profile__title']}>Profile Info</h1>
      <div className={styles['user-profile__details']}>
        <p>
          <FaUser className={styles.icon} />
          <span>Name:</span> {name}
        </p>
        <p>
          <FaEnvelope className={styles.icon} />
          <span>Email:</span> {email}
        </p>
        <p>
          <FaPhone className={styles.icon} />
          <span>Phone:</span> {phoneNumber}
        </p>
        <p>
          <FaCity className={styles.icon} />
          <span>City:</span> {city}
        </p>
      </div>
      <div className={styles['user-profile-buttons-wrapper']}>
        <button onClick={toggleChangeInfoModal} className={styles.change}>
          Change info
        </button>
        <button onClick={toggleChangeEmailModal} className={styles.change}>
          Change email
        </button>
        <button onClick={toggleChangePasswordModal} className={styles.change}>
          Change password
        </button>
        <button className={clsx(styles.change, styles.delete)}>
          Delete account
        </button>
      </div>
      {showChangeInfoModal &&
        createPortal(
          <ChangeInfoForm onCloseModal={toggleChangeInfoModal} />,
          document.body,
        )}
      {showChangeEmailModal &&
        createPortal(
          <ChangeEmailForm closeModal={toggleChangeEmailModal} />,
          document.body,
        )}
      {showChangePasswordModal &&
        createPortal(
          <ChangePasswordForm closeModal={toggleChangePasswordModal} />,
          document.body,
        )}
    </div>
  );
};
