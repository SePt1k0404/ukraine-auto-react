import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { getActiveClass } from '../../helpers/navigationHelpers/getActiveClass';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Navigation = () => {
  const location = useLocation();
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);

  return (
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
      <Link to='/about' className={styles[getActiveClass(location, '/about')]}>
        About
      </Link>
      <Link
        to='/services'
        className={styles[getActiveClass(location, '/services')]}
      >
        Services
      </Link>
      <Link
        to='/contact'
        className={styles[getActiveClass(location, '/contact')]}
      >
        Contact
      </Link>
    </nav>
  );
};
