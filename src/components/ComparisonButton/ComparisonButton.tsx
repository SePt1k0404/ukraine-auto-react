import { Link } from 'react-router-dom';

export const ComparisonButton = () => {
  return (
    <div className='flex justify-center items-center'>
      <Link
        to='/compare'
        className='px-6 mb-5 py-3 w-full bg-blue-600 text-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Compare Cars
      </Link>
    </div>
  );
};
