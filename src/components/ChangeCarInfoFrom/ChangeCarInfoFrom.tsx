import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { useFormik } from 'formik';
import { FormField } from '../FormField/FormField';
import { MouseEvent, useEffect, useState } from 'react';
import {
  IChangeCarInfoFormInitialValues,
  IChangeCarInfoFormProps,
} from './ChangeCarInfoFrom.interface';
import { changeCarFormSchema } from './ChangeCarInfoFrom.schema';
import { getDedicatedCar } from '../../features/carsList/carsListSliceFunctions/getDedicatedCar';
import { changeCarInfo } from '../../features/carsList/carsListSliceFunctions/changeCarInfo';
import { carsListAction } from '../../features/carsList/carsListSlice';
import { FaCar } from 'react-icons/fa';
import { handleAdminCarImgChange } from '../../helpers/adminHelpers/handleAdminCarImgChange';
import { handleDeleteCarImg } from '../../helpers/adminHelpers/handeDeleteCarImg';
import { handleUploadCarImg } from '../../helpers/adminHelpers/handleUploadCarImg';

export const ChangeCarInfoForm = ({
  onClose,
  carId,
}: IChangeCarInfoFormProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const [carImg, setCarImg] = useState<File | null>(null);
  const [carImgPreview, setCarImgPreview] = useState<string | null>(null);
  const { dedicatedCar } = useSelector(
    (state: RootState) => state.carsListReducer,
  );
  useEffect(() => {
    dispatch(getDedicatedCar({ carId }));
  }, []);

  useEffect(() => {
    if (dedicatedCar) {
      formik.setValues({
        model: dedicatedCar.model || '',
        year: dedicatedCar.year || '',
        price: dedicatedCar.price || '',
        mileage: dedicatedCar.mileage || '',
        desc: dedicatedCar.desc || '',
        brief: dedicatedCar.brief || '',
        image: dedicatedCar.image || undefined,
      });
    }
  }, [dedicatedCar]);

  const formik = useFormik<IChangeCarInfoFormInitialValues>({
    initialValues: {
      model: dedicatedCar?.model || '',
      year: dedicatedCar?.year || '',
      price: dedicatedCar?.price || '',
      mileage: dedicatedCar?.mileage || '',
      desc: dedicatedCar?.desc || '',
      brief: dedicatedCar?.brief || '',
      image: dedicatedCar?.image || undefined,
    },
    validationSchema: changeCarFormSchema,
    onSubmit: async (values, { resetForm }) => {
      let imgUrl = values.image;
      if (imgUrl) {
        await handleDeleteCarImg(imgUrl);
        if (carImg instanceof File) {
          imgUrl = await handleUploadCarImg(carImg);
        }
        setCarImgPreview(null);
      }
      dispatch(
        changeCarInfo({ carId, newCarInfo: { ...values, image: imgUrl } }),
      ).then(() => {
        dispatch(
          carsListAction.updateCarInList({
            carId,
            newCarInfo: { ...values, image: imgUrl },
          }),
        );
      });
      resetForm();
      onClose();
    },
  });
  return (
    <div
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onClose();
      }}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm animate-fadeIn'
    >
      <div
        className='bg-white p-6 rounded-lg shadow-lg w-1/2 animate-fadeInUp overflow-auto'
        onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <h2 className='text-xl font-semibold mb-4'>Change Car Info</h2>
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
            id='mileage'
            label='Mileage:'
            type='number'
            value={formik.values.mileage}
            error={formik.errors.mileage}
            touched={formik.touched.mileage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className='col-span-2'>
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
          </div>
          <div className='col-span-2'>
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
          </div>
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
                className='max-w-96 h-auto rounded-md'
              />
            </div>
          )}
          <button
            type='submit'
            className='col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
          >
            Change
          </button>
        </form>
        <button
          onClick={onClose}
          className='mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
