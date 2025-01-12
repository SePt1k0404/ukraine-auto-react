import { useFormik } from 'formik';
import styles from './Register.module.css';
import { registerSchema } from './Register.schema';
import { IRegistration } from './Register.interface';
import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  closeModal: () => void;
};

export const Register = ({ closeModal }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const formik = useFormik<IRegistration>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
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
        <h2 className={styles.formTitle}>Registration</h2>

        <label htmlFor='name' className={styles.formLabel}>
          Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className={styles.formInput}
          autoComplete='off'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.errorText}>{formik.errors.name}</div>
        ) : null}

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
