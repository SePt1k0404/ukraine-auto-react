import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { getActiveClass } from '../../helpers/navigationHelpers/getActiveClass';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Navigation = () => {
  const location = useLocation();
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

  return (
    <div className={!theme ? styles.dark : ''}>
      <nav className={styles.navigation}>
        <Link to='/' className={styles[getActiveClass(location, '/')]}>
          Home
        </Link>
        {jwt && (
          <Link
            to='/favoriteCars'
            className={styles[getActiveClass(location, '/favoriteCars')]}
          >
            Favorites
          </Link>
        )}
        {jwt && (
          <Link
            to='/admin'
            className={styles[getActiveClass(location, '/admin')]}
          >
            Admin
          </Link>
        )}
        <Link
          to='/about'
          className={styles[getActiveClass(location, '/about')]}
        >
          About
        </Link>
        <Link
          to='/status'
          className={styles[getActiveClass(location, '/status')]}
        >
          Status
        </Link>
        <Link
          to='/contact'
          className={styles[getActiveClass(location, '/contact')]}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};
