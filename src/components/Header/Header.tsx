import { useSelector } from 'react-redux';
import { Auth } from '../Auth/Auth';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import styles from './Header.module.css';
import { RootState } from '../../app/store';
import { UserProfile } from '../UserProfileIcon/UserProfileIcon';
import { Link } from 'react-router-dom';

export const Header = () => {
  const userToken = useSelector(
    (state: RootState) => state.userAuthReducer.jwt,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles['header-wrapper']}>
        <Logo />
        <Navigation />
        {userToken != null ? (
          <Link className={styles['user-profile-link']} to='/profile'>
            <UserProfile />
          </Link>
        ) : (
          <Auth />
        )}
        <Button className={styles['burger-menu']}>
          <BurgerMenu />
        </Button>
      </div>
    </div>
  );
};
