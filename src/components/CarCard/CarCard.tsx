import {
  AiFillHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineTool,
} from 'react-icons/ai';
import { ICarCardProps } from './CarCard.interface';
import { Link } from 'react-router-dom';

export const CarCard = ({
  id,
  model,
  year,
  price,
  image,
  likes,
  brief,
}: ICarCardProps) => {
  return (
    <li
      className='animate-fadeInUp group bg-custom-gradient-light
     border-solid border-[1px] border-[#ddd] flex flex-col items-start
      overflow-hidden rounded-xl shadow-lg transition ease hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl duration-300'
    >
      <Link className='h-full flex flex-col items-start' to={`carCard/${id}`}>
        <img
          src={image}
          alt='Car Model'
          className='w-full h-48 object-cover transition ease hover:brightness-90 duration-300'
        />
        <div className='w-full p-5 flex-grow flex flex-col'>
          <h2 className='text-2xl font-bold my-2 mx-0 text-secondary-text transition-colors ease hover:text-main-color duration-300'>
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
          <div className='flex justify-between items-end gap-4 w-full flex-grow '>
            <button
              className='flex items-center justify-center gap-3 bg-[linear-gradient(145deg,#3498db,#2980b9)] cursor-pointer font-bold
          text-base border-none rounded-lg py-2 px-4 text-white shadow-md transition-all ease hover:scale-105 hover:bg-[linear-gradient(145deg,#2980b9,#3498db)] focus:scale-105 focus:bg-[linear-gradient(145deg,#2980b9,#3498db)] active:scale-95 group-hover:shadow-[0_6px_12px_rgba(52,152,219,0.4)] duration-300'
            >
              <AiFillHeart className='w-5 h-5' /> Like
            </button>
            <span className='flex items-center gap-2 text-[#34495e] text-sm'>
              <AiFillHeart className='w-5 h-5 text-red-600' /> {likes} likes
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
