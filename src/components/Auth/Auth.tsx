import { MouseEvent, useState } from 'react';
import styles from './Auth.module.css';
import { createPortal } from 'react-dom';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export const Auth = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  const handleShowModal = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    target.dataset.name == 'login'
      ? setShowLoginModal(true)
      : setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = (): void => {
    setShowRegisterModal(false);
  };

  const handleCloseLoginModal = (): void => {
    setShowLoginModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.link}
        data-name='login'
        onClick={handleShowModal}
      >
        Login
      </button>
      <p className={styles.separator}>/</p>
      <button
        className={styles.link}
        data-name='register'
        onClick={handleShowModal}
      >
        Register
      </button>
      {showLoginModal &&
        createPortal(
          <Login closeModal={handleCloseLoginModal} />,
          document.body,
        )}
      {showRegisterModal &&
        createPortal(
          <Register closeModal={handleCloseRegisterModal} />,
          document.body,
        )}
    </div>
  );
};
