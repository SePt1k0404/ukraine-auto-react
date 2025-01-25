import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-custom-gradient-light rounded-lg'>
      <div className='text-center bg-white p-10 rounded-xl shadow-lg border-solid border-[1px] border-[#ddd] max-w-md w-full'>
        <div className='mb-6'>
          <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r  from-main-color to-pink-500 mb-4'>
            Oops! Something went wrong...
          </h1>
          <p className='text-lg text-gray-600 mb-4'>
            We're sorry, but the page you're looking for doesn't exist.
          </p>
        </div>
        <div className='flex justify-center gap-6'>
          <button
            onClick={handleGoHome}
            className='px-8 py-3 bg-[linear-gradient(145deg,#3498db,#2980b9)] cursor-pointer font-bold text-base border-none rounded-lg text-white shadow-md transition-all ease hover:scale-105 hover:bg-[linear-gradient(145deg,#2980b9,#3498db)] focus:scale-105 focus:bg-[linear-gradient(145deg,#2980b9,#3498db)] active:scale-95 group-hover:shadow-[0_6px_12px_rgba(52,152,219,0.4)] duration-300'
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};
