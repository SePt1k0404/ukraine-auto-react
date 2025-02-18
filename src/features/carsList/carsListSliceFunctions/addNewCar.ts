import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from '../../getUserId';
import { AppDDispatch } from '../../../app/store';
import { IAddNewCarFormInitialValues } from '../../../components/AddNewCarForm/AddNewCarForm.interface';
import {
  addDoc,
  collection,
  doc,
  GeoPoint,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { addAnnouncement } from '../../userProfile/userProfileSliceFunctions/addAnnouncement';

export const addNewCar = createAsyncThunk<
  void,
  {
    carInfo: IAddNewCarFormInitialValues;
    sellerInfo: {
      address: string;
      email: string;
      phoneNumber: number;
      name: string;
    };
  },
  { rejectValue: string; dispatch: AppDDispatch }
>(
  'carsList/addNewCar',
  async (
    params: {
      carInfo: IAddNewCarFormInitialValues;
      sellerInfo: {
        address: string;
        email: string;
        phoneNumber: number;
        name: string;
      };
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const uid = await getUserId(dispatch);
      if (!uid) {
        return rejectWithValue('User ID not found');
      }
      const location =
        params.carInfo.latitude !== undefined &&
        params.carInfo.longitude !== undefined
          ? new GeoPoint(params.carInfo.latitude, params.carInfo.longitude)
          : null;

      const carsCollectionRef = collection(db, 'cars');
      const docRef = await addDoc(carsCollectionRef, {
        model: params.carInfo.model,
        price: params.carInfo.price,
        year: params.carInfo.year,
        mileage: params.carInfo.mileage,
        desc: params.carInfo.desc,
        brief: params.carInfo.brief,
        ...(location ? { location } : {}),
        seller: {
          name: params.sellerInfo.name,
          address: params.sellerInfo.address,
          email: params.sellerInfo.email,
          phoneNumber: params.sellerInfo.phoneNumber,
        },
        userId: uid,
        image: params.carInfo.img,
        likes: 0,
        sold: false,
      });
      await updateDoc(doc(db, 'cars', docRef.id), {
        id: docRef.id,
      });
      await dispatch(addAnnouncement(docRef.id));
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  },
);
