import {
  AiFillHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineTool,
} from 'react-icons/ai';
import { ICarCardProps } from './CarCard.interface';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDDispatch, RootState } from '../../app/store';
import { toggleFavoriteCar } from '../../features/userProfile/userProfileSliceFunctions/toggleFavoriteCar';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';

export const CarCard = ({
  id,
  model,
  year,
  price,
  image,
  likes,
  sold,
  brief,
}: ICarCardProps) => {
  const dispatch = useDispatch<AppDDispatch>();

  const { favoritesCars } = useSelector(
    (state: RootState) => state.userProfileReducer,
  );
  const { jwt } = useSelector((state: RootState) => state.userAuthReducer);

  const isFavorite = favoritesCars.includes(id);

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
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
      dispatch(toggleFavoriteCar({ carId: id }));
    }
  };

  return (
    <li
      className={`animate-fadeInUp group bg-custom-gradient-light border-solid border-[1px] border-[#ddd] flex flex-col items-start overflow-hidden rounded-xl shadow-lg transition ease hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl duration-300 relative ${
        sold ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {sold && (
        <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-yellow-500 text-5xl font-bold'>
          SOLD
        </div>
      )}
      <Link className='h-full flex flex-col items-start' to={`carCard/${id}`}>
        <img
          src={image}
          alt='Car Model'
          className='w-full h-48 object-cover transition ease hover:brightness-90 duration-300'
        />
        <div className='w-full p-5 flex-grow flex flex-col'>
          <h2 className='text-xl font-bold my-2 mx-0 text-secondary-text transition-colors ease hover:text-main-color duration-300'>
            {model}
          </h2>
          <p className='flex items-center gap-2 text-base text-gray-500 my-1 mx-0'>
            <AiOutlineCalendar className='w-5 h-5' /> Year: {year}
          </p>
          <p className='flex items-center gap-2 text-base text-gray-500 my-0 mx-0'>
            <AiOutlineTool className='w-5 h-5 flex-shrink-0' /> Key features:{' '}
            {brief}
          </p>
          <p className='flex items-center gap-2 text-base text-green-500 font-bold my-1 mx-0'>
            <AiOutlineDollar className='w-5 h-5' /> Price: $
            {price.toLocaleString('en-US').replace(/,/g, '.')}
          </p>
        </div>
      </Link>
      <div className='w-full p-5 flex justify-between items-center'>
        <button
          className={`flex items-center justify-center gap-3 font-bold text-base border-none rounded-lg py-2 px-4 shadow-md transition-all ease duration-300 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[linear-gradient(145deg,#3498db,#2980b9)] text-white hover:scale-105 hover:bg-[linear-gradient(145deg,#2980b9,#3498db)]'
          }`}
          onClick={handleLikeClick}
          disabled={sold}
        >
          <AiFillHeart
            className={`w-5 h-5 ${isFavorite ? 'text-white' : 'text-white'}`}
          />
          {isFavorite ? 'Unlike' : 'Like'}
        </button>
        <span className='flex items-center gap-2 text-[#34495e] text-sm'>
          <AiFillHeart className='w-5 h-5 text-red-600' /> {likes} likes
        </span>
      </div>
    </li>
  );
};
