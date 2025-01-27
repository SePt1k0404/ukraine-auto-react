import * as Yup from 'yup';

export const CarSearchSchema = Yup.object().shape({
  model: Yup.string()
    .max(50, 'Model name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]*$/, 'Only alphanumeric characters are allowed'),
  year: Yup.number()
    .nullable()
    .typeError('Year must be a number')
    .min(1900, 'Year must be no earlier than 1900')
    .max(new Date().getFullYear(), `Year cannot be in the future`),
  price: Yup.number()
    .nullable()
    .typeError('Price must be a number')
    .min(500, 'Minimum price is $500'),
});
