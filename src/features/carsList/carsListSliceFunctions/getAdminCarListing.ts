import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICar } from '../carsList.interface';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const getAdminCarListing = createAsyncThunk<
  ICar[],
  string[],
  { rejectValue: string }
>('carsList/getAdminCarListing', async (announceCars, { rejectWithValue }) => {
  try {
    if (!announceCars.length) return [];

    const carList = await Promise.all(
      announceCars.map(async (carId) => {
        const dedicatedDocRef = doc(db, 'cars', carId);
        const dedicatedDocData = await getDoc(dedicatedDocRef);

        if (!dedicatedDocData.exists()) {
          throw new Error(`Car with ID ${carId} not found`);
        }

        return {
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
          location: dedicatedDocData.data()?.location
            ? {
                lat: dedicatedDocData.data()?.location.latitude,
                long: dedicatedDocData.data()?.location.longitude,
              }
            : { lat: 0, long: 0 },
          sold: dedicatedDocData.data()?.sold || false,
          id: dedicatedDocData.id || '',
        };
      }),
    );

    return carList;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});
