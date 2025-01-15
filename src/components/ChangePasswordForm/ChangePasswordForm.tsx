import { useFormik } from 'formik';
import {
  IChangePasswordInitialValues,
  IChangePasswordProps,
} from './ChangePasswordForm.interface';
import { useDispatch } from 'react-redux';
import { AppDDispatch } from '../../app/store';
import { changePasswordSchema } from './ChangePasswordForm.schema';
import styles from '../Register/Register.module.css';
import clsx from 'clsx';
import { changeUserPassword } from '../../features/userProfile/userProfileSlice';
import { useModal } from '../../app/hooks';
import { FormField } from '../FormField/FormField';

export const ChangePasswordForm = ({ closeModal }: IChangePasswordProps) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(closeModal);
  const dispatch = useDispatch<AppDDispatch>();
  const formik = useFormik<IChangePasswordInitialValues>({
    initialValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(changeUserPassword(values));
      resetForm();
      startClosing();
    },
  });
  return (
    <div
      onClick={handleBackdropClick}
      className={clsx(styles.backdrop, {
        [styles.fadeOut]: isClosing,
      })}
    >
      <form
        className={clsx(styles.registerForm, {
          [styles.formOut]: isClosing,
        })}
        onSubmit={formik.handleSubmit}
        onClick={handleFormClick}
      >
        <h2 className={styles.formTitle}>Change Your Password</h2>
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
          id='oldPassword'
          label='Old password:'
          type='password'
          value={formik.values.oldPassword}
          error={formik.errors.oldPassword}
          touched={formik.touched.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='newPassword'
          label='New email:'
          type='password'
          value={formik.values.newPassword}
          error={formik.errors.newPassword}
          touched={formik.touched.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type='submit' className={styles.formButton}>
          Change Password
        </button>
      </form>
    </div>
  );
};
