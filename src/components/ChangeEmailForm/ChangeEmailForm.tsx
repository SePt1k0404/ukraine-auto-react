import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDDispatch } from '../../app/store';
import { changeEmailFormSchema } from './ChangeEmailForm.schema';
import styles from '../Register/Register.module.css';
import { Props } from '../Auth/Auth.type';
import clsx from 'clsx';
import { IChangeEmailInitialValues } from './ChangeEmailForm.interface';
import { useModal } from '../../app/hooks';
import { FormField } from '../FormField/FormField';
import { changeUserEmail } from '../../features/userProfile/userProfileSliceFunctions/changeUserEmail';

export const ChangeEmailForm = ({ closeModal }: Props) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(closeModal);
  const dispatch = useDispatch<AppDDispatch>();

  const formik = useFormik<IChangeEmailInitialValues>({
    initialValues: {
      oldEmail: '',
      newEmail: '',
      password: '',
    },
    validationSchema: changeEmailFormSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(changeUserEmail(values));
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
        <h2 className={styles.formTitle}>Change Your Email</h2>
        <FormField
          id='oldEmail'
          label='Old email:'
          type='email'
          value={formik.values.oldEmail}
          error={formik.errors.oldEmail}
          touched={formik.touched.oldEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='newEmail'
          label='New email:'
          type='email'
          value={formik.values.newEmail}
          error={formik.errors.newEmail}
          touched={formik.touched.newEmail}
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
        <button type='submit' className={styles.formButton}>
          Change Email
        </button>
      </form>
    </div>
  );
};
