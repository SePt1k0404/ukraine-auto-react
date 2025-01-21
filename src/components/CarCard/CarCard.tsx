import {
  AiFillHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineTool,
} from 'react-icons/ai';

export const CarCard = () => {
  return (
    <li
      className='group bg-[linear-gradient(145deg,#ffffff,#f1f1f1)]
     border-solid border-[1px] border-[#ddd] flex flex-col items-start
      overflow-hidden rounded-xl shadow-lg transition ease hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl duration-300'
    >
      <img
        src='https://autodnk.com/wp-content/uploads/2024/08/911-gt3-rs-1.webp'
        alt='Car Model'
        className='w-full h-48 object-cover transition ease hover:brightness-90 duration-300'
      />
      <div className='w-full p-5'>
        <h2 className='text-2xl font-bold my-2 mx-0 text-secondary-text transition-colors ease hover:text-main-color duration-300'>
          Car Model
        </h2>
        <p className='flex items-center gap-2 text-base text-gray-500 my-1 mx-0'>
          <AiOutlineCalendar className='w-5 h-5' /> Year: 2025
        </p>
        <p className='flex items-center gap-2 text-base text-gray-500 my-1 mx-0'>
          <AiOutlineTool className='w-5 h-5' /> Key features: Fast, Reliable
        </p>
        <p className='flex items-center gap-2 text-base text-green-500 font-bold my-1 mx-0'>
          <AiOutlineDollar className='w-5 h-5' /> Price: $100,000
        </p>
        <div className='flex justify-between items-center gap-4 mt-5 w-full'>
          <button
            className='flex items-center justify-center gap-3 bg-[linear-gradient(145deg,#3498db,#2980b9)] cursor-pointer font-bold
          text-base border-none rounded-lg py-2 px-4 text-white shadow-md transition-all ease hover:scale-105 hover:bg-[linear-gradient(145deg,#2980b9,#3498db)] active:scale-95 group-hover:shadow-[0_6px_12px_rgba(52,152,219,0.4)] duration-300'
          >
            <AiFillHeart className='w-5 h-5' /> Like
          </button>
          <span className='flex items-center gap-2 text-[#34495e] text-sm'>
            <AiFillHeart className='w-5 h-5 text-red-600' /> 10 likes
          </span>
        </div>
      </div>
    </li>
  );
};
