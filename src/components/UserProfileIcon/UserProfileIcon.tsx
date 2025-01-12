import { useLocation } from 'react-router-dom';
import styles from './UserProfileIcon.module.css';

export const UserProfile = () => {
  const location = useLocation();
  const isProfilePath = location.pathname === '/profile';
  return (
    <div
      className={`${styles['user-profile-container']} ${
        isProfilePath ? styles['profile-background'] : ''
      }`}
    >
      <img
        className={styles['user-profile-icon']}
        src='/public/profile-icon.svg'
        alt='User profile icon'
      />
    </div>
  );
};
