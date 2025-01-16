import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import styles from './UserProfile.module.css';
import {
  FaEnvelope,
  FaPhone,
  FaCity,
  FaUser,
  FaSignOutAlt,
  FaCamera,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { userAuthAction } from '../../features/userAuth/userAuthSlice';
import { createPortal } from 'react-dom';
import { ChangeInfoForm } from '../../components/ChangeInfoForm/ChangeInfoForm';
import clsx from 'clsx';
import { ChangeEmailForm } from '../../components/ChangeEmailForm/ChangeEmailForm';
import { ChangePasswordForm } from '../../components/ChangePasswordForm/ChangePasswordForm';
import { CropperModal } from '../../components/CropperModal/CropperModal';
import { getUid } from '../../features/getUid';
import { setUserProfileAvatar } from '../../features/userProfile/userProfileSliceFunctions/setUserProfileAvatar';
import { getUserProfileInfo } from '../../features/userProfile/userProfileSliceFunctions/getUserProfileInfo';

export const UserProfile = () => {
  const { name, phoneNumber, email, city, avatar } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );

  const [showChangeInfoModal, setShowChangeInfoModal] =
    useState<boolean>(false);
  const [showChangeEmailModal, setShowChangeEmailModal] =
    useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showCroppedModal, setShowCroppedModal] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);

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

  const toggleCroppedModal = (): void => {
    setShowCroppedModal((state) => !state);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserAvatar(file);
      setShowCroppedModal(true);
      e.target.value = '';
    }
  };

  const handleUploadAvatar = async (file: File) => {
    const uid = await getUid();
    if (uid) {
      const cloudName = 'dkftturzq';
      const uploadPreset = 'ukraine-auto';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );
        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          dispatch(setUserProfileAvatar(imageUrl));
        } else {
          throw new Error('Image upload failed.');
        }
      } catch (error) {
        throw new Error('An error occurred while uploading the image.');
      }
    }
  };

  return (
    <div className={styles['user-profile-card']}>
      <button className={styles['logout-button']} onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
      <div className={styles['user-profile-avatar']}>
        <img
          src={avatar === null ? '/public/default-avatar.jpg' : avatar}
          alt={`${name}'s avatar`}
        />
        <label className={styles['upload-avatar']}>
          Upload avatar
          <FaCamera />
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className={styles['file-input']}
          />
        </label>
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
      {showCroppedModal &&
        createPortal(
          <CropperModal
            closeModal={toggleCroppedModal}
            avatar={userAvatar}
            uploadAvatar={handleUploadAvatar}
          />,
          document.body,
        )}
    </div>
  );
};
