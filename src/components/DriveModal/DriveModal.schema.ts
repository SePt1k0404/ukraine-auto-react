import * as Yup from 'yup';

export const driveFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  preferredDate: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Preferred date is required'),
  preferredTime: Yup.string().required('Preferred time is required'),
});
