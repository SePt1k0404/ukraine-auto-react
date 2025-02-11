import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { useFormik } from 'formik';
import { addNewCar } from '../../features/carsList/carsListSliceFunctions/addNewCar';
import { FormField } from '../FormField/FormField';
import { IAddNewCarFormInitialValues } from './AddNewCarForm.interface';
import { addNewCarFormSchema } from './AddNewCarForm.schema';
import { useEffect, useState } from 'react';
import { handleAdminCarImgChange } from '../../helpers/adminHelpers/handleAdminCarImgChange';
import { handleUploadCarImg } from '../../helpers/adminHelpers/handleUploadCarImg';
import { FaCar } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const AddNewCarForm = () => {
  const [carImg, setCarImg] = useState<File | null>(null);
  const [carImgPreview, setCarImgPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDDispatch>();
  const { city, email, name, phoneNumber } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        formik.setValues((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    );
  });

  const formik = useFormik<IAddNewCarFormInitialValues>({
    initialValues: {
      model: '',
      year: '',
      price: '',
      milage: '',
      desc: '',
      brief: '',
      img: undefined,
      latitude: undefined,
      longitude: undefined,
    },
    validationSchema: addNewCarFormSchema,
    onSubmit: async (values, { resetForm }) => {
      const { model, year, price, milage, desc, brief } = values;
      let imgUrl = '';
      if (carImg instanceof File) {
        imgUrl = await handleUploadCarImg(carImg);
      }
      setCarImgPreview(null);
      dispatch(
        addNewCar({
          carInfo: {
            model,
            year: Number(year),
            price: Number(price),
            milage: Number(milage),
            desc,
            brief,
            img: imgUrl,
            latitude: formik.values.latitude,
            longitude: formik.values.longitude,
          },
          sellerInfo: {
            name,
            address: city,
            email,
            phoneNumber: Number(phoneNumber.replace(/^\+380/, '')),
          },
        }),
      );
      resetForm();
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-4'>
        <FormField
          id='model'
          label='Model:'
          type='text'
          value={formik.values.model}
          error={formik.errors.model}
          touched={formik.touched.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='year'
          label='Year:'
          type='number'
          value={formik.values.year}
          error={formik.errors.year}
          touched={formik.touched.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='price'
          label='Price:'
          type='number'
          value={formik.values.price}
          error={formik.errors.price}
          touched={formik.touched.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='milage'
          label='Milage:'
          type='number'
          value={formik.values.milage}
          error={formik.errors.milage}
          touched={formik.touched.milage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='desc'
          label='Description:'
          type='text'
          value={formik.values.desc}
          error={formik.errors.desc}
          touched={formik.touched.desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='brief'
          label='Brief:'
          type='text'
          value={formik.values.brief}
          error={formik.errors.brief}
          touched={formik.touched.brief}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className='flex items-center space-x-2 cursor-pointer text-blue-500'>
          <span>Upload car image</span>
          <FaCar />
          <input
            type='file'
            accept='image/*'
            onChange={(e) =>
              handleAdminCarImgChange(e, setCarImg, setCarImgPreview)
            }
            className='hidden'
          />
        </label>
        {carImgPreview && (
          <div className='col-span-2 mt-2'>
            <img
              src={carImgPreview}
              alt='Selected Car'
              className='w-full h-auto rounded-md'
            />
          </div>
        )}
        <button
          type='submit'
          className='col-span-2 bg-blue-500 text-white py-2 rounded'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
