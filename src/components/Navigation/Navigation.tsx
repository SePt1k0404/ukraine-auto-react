import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useRef, MouseEvent } from 'react';

export const Navigation = () => {
  const navRef = useRef<null | HTMLDivElement>(null);

  const handleSetActiveLink = (e: MouseEvent<HTMLAnchorElement>): void => {
    const target = e.target as HTMLAnchorElement;
    if (navRef.current) {
      const linksArr = Array.from(navRef.current.querySelectorAll('a'));
      linksArr.forEach((link) => link.classList.remove(styles.active));
      target.classList.add(styles.active);
    }
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
