import * as Yup from 'yup';

export const deleteUserProfileSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Old password is required')
    .min(8, 'Password must be at least 8 characters'),
});
