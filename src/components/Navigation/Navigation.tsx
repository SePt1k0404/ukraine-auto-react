import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const location = useLocation();

  const getActiveClass = (path: string) =>
    location.pathname === path ? styles.active : '';

  return (
    <nav className={styles.navigation}>
      <Link to='/' className={getActiveClass('/')}>
        Home
      </Link>
      <Link to='/about' className={getActiveClass('/about')}>
        About
      </Link>
      <Link to='/services' className={getActiveClass('/services')}>
        Services
      </Link>
      <Link to='/contact' className={getActiveClass('/contact')}>
        Contact
      </Link>
    </nav>
  );
};
