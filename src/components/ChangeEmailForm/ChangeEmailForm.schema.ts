import * as Yup from 'yup';

export const changeEmailFormSchema = Yup.object({
  oldEmail: Yup.string()
    .required('Old email is required')
    .email('Invalid email format'),
  newEmail: Yup.string()
    .required('New email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
