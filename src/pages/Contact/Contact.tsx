import { useFormik } from 'formik';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FormField } from '../../components/FormField/FormField';
import { IContactFormInitialValues } from './Contact.interface';
import { contactValidateSchema } from './Contact.schema';

export const Contact = () => {
  const formik = useFormik<IContactFormInitialValues>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: contactValidateSchema,
    onSubmit: (_, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-4xl font-semibold text-gray-800 text-center mb-8'>
          Contact Us
        </h1>

        <div className='text-lg text-gray-700 mb-8'>
          <p>
            If you have any questions or need assistance, please feel free to
            reach out.
          </p>
        </div>

        <form className='space-y-6' onSubmit={formik.handleSubmit}>
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
            id='subject'
            label='Subject:'
            type='text'
            value={formik.values.subject}
            error={formik.errors.subject}
            touched={formik.touched.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <FormField
            id='message'
            label='Message:'
            type='textarea'
            value={formik.values.message}
            error={formik.errors.message}
            touched={formik.touched.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700'
            >
              Send Message
            </button>
          </div>
        </form>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Additional Contact Information
          </h2>
          <ul className='list-none mt-4 space-y-2 text-lg text-gray-700'>
            <li>
              <strong>Phone:</strong> +380-68-122-2315
            </li>
            <li>
              <strong>Address:</strong> 123 Shevchenko, Kyiv, Ukraine
            </li>
            <li>
              <strong>Email:</strong> ukraine-auto@mail.com
            </li>
            <li>
              <strong>Social Media:</strong>
              <ul className='list-inline space-x-4 mt-2 flex'>
                <li>
                  <a href='#' className='text-blue-500 hover:text-blue-700'>
                    <FaFacebook size={24} />
                  </a>
                </li>
                <li>
                  <a href='#' className='text-blue-500 hover:text-blue-700'>
                    <FaTwitter size={24} />
                  </a>
                </li>
                <li>
                  <a href='#' className='text-blue-500 hover:text-blue-700'>
                    <FaLinkedin size={24} />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
