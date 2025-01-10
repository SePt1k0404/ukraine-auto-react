import { Auth } from '../Auth/Auth';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['header-wrapper']}>
        <Logo />
        <Navigation />
        <Auth />
        <BurgerMenu />
      </div>
    </div>
  );
};
