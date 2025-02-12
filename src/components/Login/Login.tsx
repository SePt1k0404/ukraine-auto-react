import { useFormik } from 'formik';
import { ILogin } from './Login.interface';
import styles from '../Register/Register.module.css';
import clsx from 'clsx';
import { Props } from '../Auth/Auth.type';
import { loginSchema } from './Login.schema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { login } from '../../features/userAuth/userAuthSlice';
import { useModal } from '../../app/hooks';
import { FormField } from '../FormField/FormField';
import { toast } from 'react-toastify';
import { forgotPasswordHandler } from '../../helpers/authHelpers/forgotPassword';

export const Login = ({ closeModal }: Props) => {
  const { isClosing, startClosing, handleBackdropClick, handleFormClick } =
    useModal(closeModal);
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);
  const dispatch = useDispatch<AppDDispatch>();
  const formik = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      const resultAction = await dispatch(login(values));

      if (login.fulfilled.match(resultAction)) {
        resetForm();
        startClosing();
      } else {
        toast.error(resultAction.payload, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });
  return (
    <div className={!theme ? styles.dark : ''}>
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
          <button type='submit' className={styles.formButton}>
            Login
          </button>
          <button
            type='button'
            onClick={() => {
              handleBackdropClick();
              forgotPasswordHandler(formik.values.email, dispatch);
            }}
            className={styles.forgotPassword}
          >
            Forgot password? Enter your email and click me!
          </button>
        </form>
      </div>
    </div>
  );
};
