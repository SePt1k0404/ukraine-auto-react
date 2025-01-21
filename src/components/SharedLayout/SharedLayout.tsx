import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './SharedLayout.module.css';
import { Footer } from '../Footer/Footer';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
