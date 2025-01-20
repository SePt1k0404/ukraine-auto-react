import * as Yup from 'yup';

export const changePasswordSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  oldPassword: Yup.string()
    .required('Old password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
});
