import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import styles from './UserProfile.module.css';
import { FaEnvelope, FaPhone, FaCity, FaUser } from 'react-icons/fa';
import { useEffect } from 'react';
import { getUserProfileInfo } from '../../features/userProfile/userProfileSlice';

export const UserProfile = () => {
  const { name, email, phoneNumber, city } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const dispatch = useDispatch<AppDDispatch>();
  useEffect(() => {
    if (!name || !email || !phoneNumber || !city) {
      dispatch(getUserProfileInfo());
    }
  }, [name, email, phoneNumber, city]);

  return (
    <div className={styles['user-profile-card']}>
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
      <button className={styles.change}>Change info</button>
    </div>
  );
};
