import styles from './BurgerMenu.module.css';

export const BurgerMenu = () => {
  return (
    <img
      className={styles['burger-menu']}
      src='../../../public/burger-menu.svg'
      alt='burger menu'
    />
  );
};
