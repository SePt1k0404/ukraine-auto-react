import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICar } from '../carsList.interface';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const getDedicatedCar = createAsyncThunk<
  ICar,
  {
    carId: string;
  },
  { rejectValue: string }
>('carsList/getDedicatedCar', async ({ carId }, { rejectWithValue }) => {
  try {
    const dedicatedDocRef = doc(db, 'cars', carId);
    const dedicatedDocData = await getDoc(dedicatedDocRef);

    if (!dedicatedDocData.exists()) {
      return rejectWithValue('Car not found');
    }

    const dedicatedCarInfo: ICar = {
      model: dedicatedDocData.data()?.model || '',
      year: dedicatedDocData.data()?.year || 0,
      price: dedicatedDocData.data()?.price || 0,
      desc: dedicatedDocData.data()?.desc || '',
      brief: dedicatedDocData.data()?.brief || '',
      likes: dedicatedDocData.data()?.likes || 0,
      mileage: dedicatedDocData.data()?.mileage || 0,
      image: dedicatedDocData.data()?.image || '',
      seller: dedicatedDocData.data()?.seller || {
        name: '',
        phoneNumber: null,
        email: '',
        address: '',
      },
      id: dedicatedDocData.id || '',
    };
    return dedicatedCarInfo;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});
