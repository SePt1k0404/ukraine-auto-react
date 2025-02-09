import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteUserProfileModalProps,
  IDeleteUserProfileInitialValues,
} from './DeleteUserProfileModal.interface';
import styles from './DeleteUserProfileModal.module.css';
import { AppDDispatch, RootState } from '../../app/store';
import { useFormik } from 'formik';
import { deleteUserProfileSchema } from './DeleteUserProfileModal.schema';
import { deleteUserProfile } from '../../features/userProfile/userProfileSliceFunctions/deleterUserProfile';
import { useModal } from '../../app/hooks';
import clsx from 'clsx';
import { FormField } from '../FormField/FormField';

export const DeleteUserProfileModal = ({
  closeModal,
}: DeleteUserProfileModalProps) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(closeModal);
  const dispatch = useDispatch<AppDDispatch>();
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);
  const formik = useFormik<IDeleteUserProfileInitialValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: deleteUserProfileSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(deleteUserProfile(values));
      resetForm();
      startClosing();
    },
  });
  return (
    <div className={!theme ? styles.dark : ''}>
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
          <h2 className={styles.formTitle}>Delete Profile</h2>
          <p className={styles.warning}>
            Are you sure you want to delete your account? This action is
            permanent and cannot be undone. All your data, including personal
            details and preferences, will be removed.
          </p>
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
          <div className={styles.actions}>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
            <button className={styles.formButton} type='submit'>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
