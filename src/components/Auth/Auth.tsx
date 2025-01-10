import styles from './Auth.module.css';

export const Auth = () => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.link} href='#'>
        Login
      </a>
      <p className={styles.separator}>/</p>
      <a className={styles.link} href='#'>
        Register
      </a>
    </div>
  );
};
