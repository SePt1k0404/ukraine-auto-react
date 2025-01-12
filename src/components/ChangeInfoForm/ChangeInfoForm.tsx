import styles from './ChangeInfoForm.module.css';

export const ChangeInfoForm = () => {
  return (
    <form className={styles['change-info-form']}>
      <h2 className={styles['form-title']}>Change Your Information</h2>
      <div className={styles['form-group']}>
        <label htmlFor='name' className={styles['form-label']}>
          Name
        </label>
        <input type='text' id='name' className={styles['form-input']} />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor='email' className={styles['form-label']}>
          Email
        </label>
        <input type='email' id='email' className={styles['form-input']} />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor='password' className={styles['form-label']}>
          Password
        </label>
        <input type='password' id='password' className={styles['form-input']} />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor='phone' className={styles['form-label']}>
          Phone Number
        </label>
        <input type='tel' id='phone' className={styles['form-input']} />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor='city' className={styles['form-label']}>
          City
        </label>
        <input type='text' id='city' className={styles['form-input']} />
      </div>
      <button type='submit' className={styles['form-submit']}>
        Save Changes
      </button>
    </form>
  );
};
