import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { MouseEvent, useEffect, useState } from 'react';
import { getDedicatedCar } from '../../features/carsList/carsListSliceFunctions/getDedicatedCar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ContactSellerForm } from '../../components/ContactSellerForm/ContactSellerForm';
import { createPortal } from 'react-dom';
import { DriveModal } from '../../components/DriveModal/DriveModal';
import { handleToggleModal } from '../../helpers/carCardPageHelpers/toggleModal';
import { handleCheckout } from '../../helpers/carCardPageHelpers/checkout';
import { handleAddToFavorites } from '../../helpers/carCardPageHelpers/addToFavorite';
import { handleComparisonCar } from '../../helpers/carCardPageHelpers/comparisonCars';

export const CarCard = () => {
  const dispatch = useDispatch<AppDDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { carId } = useParams<{ carId: string }>();

  const { dedicatedCar, isLoading, error, isSuccess, carsComparison } =
    useSelector((state: RootState) => state.carsListReducer);
  const { favoritesCars, theme } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);

  const [showContactSellerModal, setShowContactSellerModal] =
    useState<boolean>(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState<boolean>(false);

  useEffect(() => {
    if (carId) {
      dispatch(getDedicatedCar({ carId }));
    }
  }, [dispatch, carId]);
  useEffect(() => {
    if (location.pathname.includes('favoriteCars') && !jwt) {
      navigate('/');
    }
  }, [jwt]);

  const isFavorite = carId && favoritesCars.includes(carId);
  const isChecked = carsComparison.find((car) => car.id === dedicatedCar?.id);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
      </div>
    );
  }
  if (error) {
    navigate('/error');
  }
  if (!dedicatedCar || !isSuccess) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500 text-lg'>Car details not available.</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg ${
        theme ? 'bg-white text-gray-800' : 'bg-background-dark text-text-light'
      }`}
    >
      <button
        onClick={() => {
          location.pathname.includes('favoriteCars')
            ? navigate('/favoriteCars')
            : navigate('/');
        }}
        className={`px-4 py-2 mb-4 ${
          theme
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-main-color-dark text-white hover:bg-secondary-color-dark'
        } font-semibold rounded-lg shadow-md transition-all duration-300`}
      >
        Back to Listings
      </button>
      <div className='relative overflow-hidden rounded-lg group'>
        <img
          src={dedicatedCar.image || '/public/car-img-placeholder.webp'}
          alt={dedicatedCar.model}
          className='w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
        />
        <div
          className={`absolute inset-0 ${
            theme
              ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent'
              : 'bg-gradient-to-t from-background-dark via-transparent to-transparent'
          } group-hover:from-black/70 transition-all duration-300`}
        ></div>
        <div
          className={`absolute bottom-4 left-4 text-green-500 text-lg font-semibold bg-green-900 px-3 py-1 rounded-lg group-hover:opacity-100 opacity-80 transition-opacity ${
            theme ? '' : 'text-text-light'
          }`}
        >
          ${dedicatedCar.price.toLocaleString('en-US').replace(/,/g, '.')}
        </div>
      </div>

      <div className='text-center mt-6'>
        <h1
          className={`text-3xl font-bold ${
            theme ? 'text-gray-800' : 'text-text-light'
          } hover:text-blue-500 transition-colors duration-300`}
        >
          {dedicatedCar.model} ({dedicatedCar.year})
        </h1>
        <p
          className={`text-base mt-2 italic ${
            theme ? 'text-gray-600' : 'text-text-light'
          }`}
        >
          {dedicatedCar.brief || 'No brief description available.'}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-6'>
        <div className='text-left'>
          <p
            className={`text-lg font-medium ${
              theme ? 'text-gray-700' : 'text-text-light'
            }`}
          >
            Mileage:{' '}
            <span
              className={`${theme ? 'text-gray-900' : 'text-text-light'} font-bold`}
            >
              {dedicatedCar.mileage.toLocaleString('en-US')} km
            </span>
          </p>
          <p
            className={`text-lg font-medium ${
              theme ? 'text-gray-700' : 'text-text-light'
            }`}
          >
            Likes:{' '}
            <span
              className={`${theme ? 'text-gray-900' : 'text-text-light'} font-bold`}
            >
              {dedicatedCar.likes}
            </span>
          </p>
        </div>
        <div className='text-left'>
          <p
            className={`text-lg font-medium ${
              theme ? 'text-gray-700' : 'text-text-light'
            }`}
          >
            Price:{' '}
            <span className='font-bold text-green-500'>
              ${dedicatedCar.price.toLocaleString('en-US').replace(/,/g, '.')}
            </span>
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <h2
          className={`text-xl font-semibold ${theme ? 'text-gray-800' : 'text-text-light'} border-b pb-2`}
        >
          Description
        </h2>
        <p
          className={`text-gray-700 mt-4 leading-relaxed ${theme ? '' : 'text-text-light'}`}
        >
          {dedicatedCar.desc || 'No detailed description available.'}
        </p>
      </div>

      <div className='mt-8 flex flex-col gap-3'>
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            handleToggleModal(
              e,
              setShowContactSellerModal,
              setShowTestDriveModal,
            )
          }
          data-name='seller'
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            theme
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              : 'bg-main-color-dark text-text-light hover:bg-secondary-color-dark'
          }`}
        >
          Contact with Seller
        </button>
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            handleToggleModal(
              e,
              setShowContactSellerModal,
              setShowTestDriveModal,
            )
          }
          data-name='drive'
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            theme
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              : 'bg-main-color-dark text-text-light hover:bg-secondary-color-dark'
          }`}
        >
          Test Drive
        </button>
        <div className='flex flex-col'>
          <button
            disabled={carsComparison.length >= 3 && !isChecked}
            onClick={() =>
              handleComparisonCar(dedicatedCar, isChecked, dispatch)
            }
            className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
              carsComparison.length >= 3 && !isChecked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {isChecked ? 'Remove from Comparison' : 'Add to Comparison'}
          </button>

          {carsComparison.length >= 3 && !isChecked && (
            <p className='mt-2 text-sm text-red-500 text-center'>
              Maximum of 3 cars can be added to the comparison list
            </p>
          )}
        </div>
      </div>

      <div className='flex justify-between mt-8 gap-4'>
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => {
            handleAddToFavorites(jwt, carId, dispatch);
          }}
        >
          <AiFillHeart
            className={`w-5 h-5 ${isFavorite ? 'text-white' : 'text-white'}`}
          />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <button
          onClick={() => {
            handleCheckout(jwt, carId, navigate);
          }}
          className='px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300'
        >
          Checkout
        </button>
      </div>

      {showContactSellerModal &&
        createPortal(
          <ContactSellerForm
            onCloseModal={() => setShowContactSellerModal(false)}
          />,
          document.body,
        )}
      {showTestDriveModal &&
        createPortal(
          <DriveModal onCloseModal={() => setShowTestDriveModal(false)} />,
          document.body,
        )}
    </div>
  );
};
