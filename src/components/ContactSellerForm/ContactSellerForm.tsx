import { useFormik } from 'formik';
import { useModal } from '../../app/hooks';
import {
  IContactSellerInitialValues,
  IContactSellerModalProps,
} from './ContactSellerForm.interface';
import { contactSellerSchema } from './ContactSellerForm.schema';
import styles from './ContactSellerForm.module.css';
import { FormField } from '../FormField/FormField';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const ContactSellerForm = ({
  onCloseModal,
}: IContactSellerModalProps) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(onCloseModal);
  const seller = useSelector(
    (state: RootState) => state.carsListReducer.dedicatedCar?.seller,
  );
  const formik = useFormik<IContactSellerInitialValues>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema: contactSellerSchema,
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
        className={clsx(styles['contact-seller-form'], {
          [styles.formOut]: isClosing,
        })}
        onSubmit={formik.handleSubmit}
        onClick={handleFormClick}
      >
        <h2 className={styles['form-title']}>Contact with seller</h2>
        <div className={styles['seller-info']}>
          <p>
            <strong>Seller:</strong> {seller?.name || 'Unknown'}
          </p>
          <p>
            <strong>Phone:</strong> {seller?.phoneNumber || 'Not provided'}
          </p>
          <p>
            <strong>Email:</strong> {seller?.email || 'Not provided'}
          </p>
          <p>
            <strong>Address:</strong> {seller?.address || 'Not provided'}
          </p>
        </div>
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
        <button type='submit' className={styles['form-submit']}>
          Save Changes
        </button>
      </form>
    </div>
  );
};
