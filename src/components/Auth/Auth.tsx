import { useState } from 'react';
import styles from './Auth.module.css';
import { createPortal } from 'react-dom';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import {
  handleCloseLoginModal,
  handleCloseRegisterModal,
  handleShowModal,
} from '../../helpers/authHelpers/showModal';

export const Auth = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.link}
        data-name='login'
        onClick={(e) =>
          handleShowModal(e, setShowLoginModal, setShowRegisterModal)
        }
      >
        Login
      </button>
      <p className={styles.separator}>/</p>
      <button
        className={styles.link}
        data-name='register'
        onClick={(e) =>
          handleShowModal(e, setShowLoginModal, setShowRegisterModal)
        }
      >
        Register
      </button>
      {showLoginModal &&
        createPortal(
          <Login closeModal={() => handleCloseLoginModal(setShowLoginModal)} />,
          document.body,
        )}
      {showRegisterModal &&
        createPortal(
          <Register
            closeModal={() => handleCloseRegisterModal(setShowRegisterModal)}
          />,
          document.body,
        )}
    </div>
  );
};
