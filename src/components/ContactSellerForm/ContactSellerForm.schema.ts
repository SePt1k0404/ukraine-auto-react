import * as Yup from 'yup';

export const contactSellerSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      'Invalid phone number format (e.g., +1234567890)',
    ),
});
