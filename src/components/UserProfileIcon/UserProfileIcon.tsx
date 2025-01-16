import { useLocation } from 'react-router-dom';
import styles from './UserProfileIcon.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { getUserProfileInfo } from '../../features/userProfile/userProfileSlice';
import { useEffect } from 'react';

export const UserProfile = () => {
  const { avatar } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const dispatch = useDispatch<AppDDispatch>();
  const location = useLocation();
  useEffect(() => {
    dispatch(getUserProfileInfo());
  }, [dispatch]);
  const isProfilePath = location.pathname === '/profile';
  return (
    <div
      className={`${styles['user-profile-container']} ${
        isProfilePath ? styles['profile-background'] : ''
      }`}
    >
      <img
        className={styles['user-profile-icon']}
        src={avatar === null ? '/public/profile-icon.svg' : avatar}
        alt='User profile icon'
      />
    </div>
  );
};
