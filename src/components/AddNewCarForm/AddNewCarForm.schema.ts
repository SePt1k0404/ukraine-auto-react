import * as Yup from 'yup';

export const addNewCarFormSchema = Yup.object({
  model: Yup.string().required('Model is required'),
  year: Yup.number().required('Year is required').min(1886, 'Invalid year'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
  mileage: Yup.number()
    .required('Mileage is required')
    .min(0, 'Mileage cannot be negative'),
  desc: Yup.string()
    .required('Description is required')
    .max(100, 'Description is too long'),
  brief: Yup.string()
    .required('Brief is required')
    .max(30, 'Brief is too long'),
});
