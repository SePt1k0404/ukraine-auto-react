import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <Link className={styles.logo} to='/'>
      <img src='../../../public/logo.svg' alt='logotype'></img>
      <span className={styles['logo-name']}>Ukraine - Auto</span>
    </Link>
  );
};
