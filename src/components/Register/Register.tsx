import { useFormik } from 'formik';
import styles from './Register.module.css';
import { registerSchema } from './Register.schema';
import { IRegistration } from './Register.interface';
import clsx from 'clsx';
import { Props } from '../Auth/Auth.type';
import { useDispatch } from 'react-redux';
import { registration } from '../../features/userAuth/userAuthSlice';
import { AppDDispatch } from '../../app/store';
import { useModal } from '../../app/hooks';
import { FormField } from '../FormField/FormField';

export const Register = ({ closeModal }: Props) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(closeModal);

  const dispatch = useDispatch<AppDDispatch>();

  const formik = useFormik<IRegistration>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      city: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(registration(values));
      resetForm();
      startClosing();
    },
  });

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
        <FormField
          id='name'
          label='Name:'
          type='text'
          value={formik.values.name}
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='email'
          label='Email:'
          type='email'
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='password'
          label='Password:'
          type='password'
          value={formik.values.password}
          error={formik.errors.password}
          touched={formik.touched.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='phoneNumber'
          label='Phone number:'
          type='tel'
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='city'
          label='City:'
          type='text'
          value={formik.values.city}
          error={formik.errors.city}
          touched={formik.touched.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type='submit' className={styles.formButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
