import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useRef } from 'react';

export const Navigation = () => {
  const navRef = useRef(null);

  const handleSetActiveLink = (e) => {
    const linksArr = navRef.current.children;
    [...linksArr].forEach((link) => link.classList.remove(styles.active));
    e.target.classList.add(styles.active);
  };

  return (
    <nav className={styles.navigation} ref={navRef}>
      <Link onClick={handleSetActiveLink} to='/' className={styles.active}>
        Home
      </Link>
      <Link onClick={handleSetActiveLink} to='/about'>
        About
      </Link>
      <Link onClick={handleSetActiveLink} to='/services'>
        Services
      </Link>
      <Link onClick={handleSetActiveLink} to='/contact'>
        Contact
      </Link>
    </nav>
  );
};
