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
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChangeInfoForm } from '../../components/ChangeInfoForm/ChangeInfoForm';
import clsx from 'clsx';
import { ChangeEmailForm } from '../../components/ChangeEmailForm/ChangeEmailForm';
import { ChangePasswordForm } from '../../components/ChangePasswordForm/ChangePasswordForm';
import { CropperModal } from '../../components/CropperModal/CropperModal';
import { getUserProfileInfo } from '../../features/userProfile/userProfileSliceFunctions/getUserProfileInfo';
import {
  toggleChangeEmailModal,
  toggleChangeInfoModal,
  toggleChangePasswordModal,
  toggleCroppedModal,
  toggleDeleteModal,
} from '../../helpers/userProfileHelpers/userProfileToggleModal';
import { handleLogout } from '../../helpers/userProfileHelpers/userProfileLogout';
import { handleFileChange } from '../../helpers/userProfileHelpers/userProfileAvatarChanger';
import { DeleteUserProfileModal } from '../../components/DeleteUserProfileModal/DeleteUserProfileModal';
import { userProfileAction } from '../../features/userProfile/userProfileSlice';
import { saveTheme } from '../../app/storege';
import { THEME_PERSISTENT } from '../../features/userProfile/userProfileSliceInitialState';

export const UserProfile = () => {
  const {
    name,
    phoneNumber,
    email,
    city,
    avatar,
    emailPreferences,
    privacy,
    theme,
  } = useSelector((state: RootState) => state.userProfileReducer);

  const [showChangeInfoModal, setShowChangeInfoModal] =
    useState<boolean>(false);
  const [showChangeEmailModal, setShowChangeEmailModal] =
    useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showCroppedModal, setShowCroppedModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);

  const dispatch = useDispatch<AppDDispatch>();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme ? 'light' : 'dark');
  }, [theme]);

  useEffect(() => {
    if (!name || !email || !phoneNumber || !city) {
      dispatch(getUserProfileInfo());
    }
  }, [dispatch]);

  return (
    <div className={!theme ? styles.dark : ''}>
      <div className={clsx(styles['user-profile-card'])}>
        <button
          className={styles['theme-toggle']}
          onClick={() => {
            dispatch(userProfileAction.toggleTheme());
            saveTheme(theme, THEME_PERSISTENT);
          }}
        >
          {theme ? (
            <FaSun className='text-yellow-300' />
          ) : (
            <FaMoon className='text-main-color' />
          )}{' '}
        </button>

        <button
          className={styles['logout-button']}
          onClick={() => handleLogout(dispatch)}
        >
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
              onChange={(e) =>
                handleFileChange(e, setUserAvatar, setShowCroppedModal)
              }
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
        <div className={styles['email-preferences']}>
          <h2 className={styles['email-preferences__title']}>
            Email Preferences
          </h2>
          <div className={styles['email-preferences__options']}>
            <label
              className={styles['email-preferences__option']}
              title='To change, use "Change info button"'
            >
              <input
                type='checkbox'
                checked={emailPreferences.newsletters}
                onChange={() => {}}
              />
              Receive Newsletters
            </label>
            <label
              className={styles['email-preferences__option']}
              title='To change, use "Change info button"'
            >
              <input
                type='checkbox'
                checked={emailPreferences.notifications}
                onChange={() => {}}
              />
              Receive Notifications
            </label>
            <label
              className={styles['email-preferences__option']}
              title='To change, use "Change info button"'
            >
              <input
                type='checkbox'
                checked={emailPreferences.promotions}
                onChange={() => {}}
              />
              Receive Promotional Emails
            </label>
          </div>
        </div>
        <div className={styles['privacy-settings']}>
          <h2 className={styles['privacy-settings__title']}>Privacy</h2>
          <div className={styles['privacy-settings__options']}>
            <label
              className={styles['privacy-settings__option']}
              title='To change, use "Change info button"'
            >
              <input type='checkbox' checked={privacy} onChange={() => {}} />
              Private profile
            </label>
          </div>
        </div>
        <div className={styles['user-profile-buttons-wrapper']}>
          <button
            onClick={() => toggleChangeInfoModal(setShowChangeInfoModal)}
            className={styles.change}
          >
            Change info
          </button>
          <button
            onClick={() => toggleChangeEmailModal(setShowChangeEmailModal)}
            className={styles.change}
          >
            Change email
          </button>
          <button
            onClick={() =>
              toggleChangePasswordModal(setShowChangePasswordModal)
            }
            className={styles.change}
          >
            Change password
          </button>
          <button
            className={clsx(styles.change, styles.delete)}
            onClick={() => toggleDeleteModal(setShowDeleteModal)}
          >
            Delete account
          </button>
        </div>
        {showChangeInfoModal &&
          createPortal(
            <ChangeInfoForm
              onCloseModal={() => toggleChangeInfoModal(setShowChangeInfoModal)}
            />,
            document.body,
          )}
        {showChangeEmailModal &&
          createPortal(
            <ChangeEmailForm
              closeModal={() => toggleChangeEmailModal(setShowChangeEmailModal)}
            />,
            document.body,
          )}
        {showChangePasswordModal &&
          createPortal(
            <ChangePasswordForm
              closeModal={() =>
                toggleChangePasswordModal(setShowChangePasswordModal)
              }
            />,
            document.body,
          )}
        {showDeleteModal &&
          createPortal(
            <DeleteUserProfileModal
              closeModal={() => toggleDeleteModal(setShowDeleteModal)}
              onDelete={() => {}}
            />,
            document.body,
          )}
        {showCroppedModal &&
          createPortal(
            <CropperModal
              closeModal={() => toggleCroppedModal(setShowCroppedModal)}
              avatar={userAvatar}
              dispatch={dispatch}
            />,
            document.body,
          )}
      </div>
    </div>
  );
};
