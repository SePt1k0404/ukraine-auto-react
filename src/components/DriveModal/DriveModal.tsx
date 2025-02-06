import { useModal } from '../../app/hooks';
import {
  IDriveModalInitialValues,
  IDriveModalProps,
} from './DriveModal.interface';
import { useFormik } from 'formik';
import { driveFormSchema } from './DriveModal.schema';
import styles from './DriveModal.module.css';
import { FormField } from '../FormField/FormField';
import clsx from 'clsx';

export const DriveModal = ({ onCloseModal }: IDriveModalProps) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(onCloseModal);

  const formik = useFormik<IDriveModalInitialValues>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
    },
    validationSchema: driveFormSchema,
    onSubmit: (_, { resetForm }) => {
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
        className={clsx(styles['change-info-form'], {
          [styles.formOut]: isClosing,
        })}
        onSubmit={formik.handleSubmit}
        onClick={handleFormClick}
      >
        <h2 className={styles['form-title']}>Test Drive Form</h2>

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
          id='preferredDate'
          label='Preferred Date:'
          type='date'
          value={formik.values.preferredDate}
          error={formik.errors.preferredDate}
          touched={formik.touched.preferredDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <FormField
          id='preferredTime'
          label='Preferred Time:'
          type='time'
          value={formik.values.preferredTime}
          error={formik.errors.preferredTime}
          touched={formik.touched.preferredTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button type='submit' className={styles['form-submit']}>
          Submit
        </button>
      </form>
    </div>
  );
};
