import {
  AiFillHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineTool,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { IAdminCarCardProps } from './AdminCarCard.interface';
import { FaTrash } from 'react-icons/fa';
import { deleteCarAnnounce } from '../../features/carsList/carsListSliceFunctions/deleteCarAnnounce';
import { createPortal } from 'react-dom';
import { DeleteAnnouncementModal } from '../DeleteAnnouncementModal/DeleteAnnouncementModal';
import { ChangeCarInfoForm } from '../ChangeCarInfoFrom/ChangeCarInfoFrom';
import { handleDeleteCarImg } from '../../helpers/adminHelpers/handeDeleteCarImg';

export const AdminCarCard = ({
  id,
  model,
  year,
  price,
  image,
  likes,
  sold,
  brief,
}: IAdminCarCardProps) => {
  const dispatch = useDispatch<AppDDispatch>();
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [showChangeCarInfoForm, setShowChangeCarInfoForm] =
    useState<boolean>(false);
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!jwt) {
      toast.info('Firstly login/register to add car to favorites', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(deleteCarAnnounce(id));
      if (image) {
        handleDeleteCarImg(image);
      }
    }
  };

  return (
    <li
      className={clsx(
        'animate-fadeInUp group bg-custom-gradient-light border-solid border-[1px] border-[#ddd] flex flex-col items-start overflow-hidden rounded-xl shadow-lg transition ease hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl duration-300 relative',
        {
          'opacity-50 pointer-events-none': sold,
        },
      )}
      onClick={() => {
        setShowChangeCarInfoForm(true);
      }}
    >
      {sold && (
        <div
          className={clsx(
            'absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-5xl font-bold',
            {
              'text-yellow-500': theme,
              'text-text-light': !theme,
            },
          )}
        >
          SOLD
        </div>
      )}
      <div
        className={clsx('h-full w-full flex flex-col items-start', {
          'bg-white text-gray-800': theme,
          'bg-background-dark text-text-light': !theme,
        })}
      >
        <img
          src={image || '/public/car-img-placeholder.webp'}
          alt='Car Model'
          className='w-full h-48 object-cover transition ease hover:brightness-90 duration-300'
        />
        <div className='w-full p-5 flex-grow flex flex-col'>
          <h2
            className={clsx(
              'text-xl font-bold my-2 mx-0 transition-colors ease hover:text-main-color duration-300',
              {
                'text-secondary-text': theme,
                'text-text-light': !theme,
              },
            )}
          >
            {model}
          </h2>
          <p
            className={clsx('flex items-center gap-2 text-base my-1 mx-0', {
              'text-gray-500': theme,
              'text-text-light': !theme,
            })}
          >
            <AiOutlineCalendar className='w-5 h-5' /> Year: {year}
          </p>
          <p
            className={clsx('flex items-center gap-2 text-base my-0 mx-0', {
              'text-gray-500': theme,
              'text-text-light': !theme,
            })}
          >
            <AiOutlineTool className='w-5 h-5 flex-shrink-0' /> Key features:{' '}
            {brief}
          </p>
          <p
            className={clsx(
              'flex items-center gap-2 text-base font-bold my-1 mx-0',
              {
                'text-green-500': theme,
                'text-text-light': !theme,
              },
            )}
          >
            <AiOutlineDollar className='w-5 h-5' /> Price: $
            {price.toLocaleString('en-US').replace(/,/g, '.')}
          </p>
        </div>
      </div>
      <div
        className={clsx('w-full p-5 flex justify-between items-center', {
          'bg-white text-gray-800': theme,
          'bg-background-dark text-text-light': !theme,
        })}
      >
        <button
          className={clsx(
            'flex items-center justify-center gap-3 font-bold text-base border-none rounded-lg py-2 px-4 shadow-md transition-all ease duration-300',
            'bg-red-600 text-white hover:scale-105 hover:bg-red-700',
            {
              'opacity-50 cursor-not-allowed': sold,
            },
          )}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setShowPrompt(true);
          }}
        >
          <FaTrash className={clsx('w-5 h-5')} />
          Remove an announce
        </button>
        <span
          className={clsx('flex items-center gap-2 text-sm', {
            ' text-gray-800': theme,
            ' text-text-light': !theme,
          })}
        >
          <AiFillHeart className='w-5 h-5 text-red-600' /> {likes} likes
        </span>
      </div>
      {showPrompt &&
        createPortal(
          <DeleteAnnouncementModal
            onClose={() => {
              setShowPrompt(false);
            }}
            handleRemoveClick={(e: MouseEvent<HTMLButtonElement>) =>
              handleRemoveClick(e)
            }
          />,
          document.body,
        )}
      {showChangeCarInfoForm &&
        createPortal(
          <ChangeCarInfoForm
            onClose={() => {
              setShowChangeCarInfoForm(false);
            }}
            carId={id}
          />,
          document.body,
        )}
    </li>
  );
};
