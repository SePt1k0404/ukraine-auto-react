import { useDispatch, useSelector } from 'react-redux';
import {
  IChangeInfoInitialValues,
  IChangeInfoModalProps,
} from './ChangeInfoForm.interface';
import styles from './ChangeInfoForm.module.css';
import { AppDDispatch, RootState } from '../../app/store';
import { useFormik } from 'formik';
import { changeInfoSchema } from './ChangeInfoForm.schema';
import clsx from 'clsx';
import { changeUserInfo } from '../../features/userProfile/userProfileSlice';
import { useModal } from '../../app/hooks';
import { FormField } from '../FormField/FormField';

export const ChangeInfoForm = ({ onCloseModal }: IChangeInfoModalProps) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(onCloseModal);
  const { name, phoneNumber, city } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );

  const dispatch = useDispatch<AppDDispatch>();

  const formik = useFormik<IChangeInfoInitialValues>({
    initialValues: {
      name,
      phoneNumber,
      city,
    },
    validationSchema: changeInfoSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      dispatch(changeUserInfo(values));
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
        <h2 className={styles['form-title']}>Change Your Information</h2>
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
          id='phone'
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
        <button type='submit' className={styles['form-submit']}>
          Save Changes
        </button>
      </form>
    </div>
  );
};
