import { useFormik } from 'formik';
import { ILogin } from './Login.interface';
import styles from '../Register/Register.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { Props } from '../Auth/Auth.type';
import { loginSchema } from './Login.schema';
import { useDispatch } from 'react-redux';
import { AppDDispatch } from '../../app/store';
import { login } from '../../features/userAuth/userAuthSlice';

export const Login = ({ closeModal }: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch<AppDDispatch>();
  const formik = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values));
      resetForm();
      startClosing();
    },
  });

  const startClosing = () => {
    setIsClosing(true);
    setTimeout(closeModal, 500);
  };

  const handleBackdropClick = () => {
    startClosing();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className={clsx(styles.backdrop, {
        [styles.fadeOut]: isClosing,
      })}
      onClick={handleBackdropClick}
    >
      <form
        onSubmit={formik.handleSubmit}
        className={clsx(styles.registerForm, {
          [styles.formOut]: isClosing,
        })}
        onClick={handleFormClick}
      >
        <h2 className={styles.formTitle}>Login</h2>
        <label htmlFor='email' className={styles.formLabel}>
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className={styles.formInput}
          autoComplete='off'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.errorText}>{formik.errors.email}</div>
        ) : null}

        <label htmlFor='password' className={styles.formLabel}>
          Password:
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className={styles.formInput}
          autoComplete='off'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errorText}>{formik.errors.password}</div>
        ) : null}

        <button type='submit' className={styles.formButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
