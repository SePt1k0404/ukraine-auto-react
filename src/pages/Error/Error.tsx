import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import clsx from 'clsx';

export const Error = () => {
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div
      className={clsx(
        'flex justify-center items-center h-screen',
        theme ? 'bg-custom-gradient-light' : 'bg-custom-gradient-dark',
      )}
    >
      <div
        className={clsx(
          'text-center p-10 rounded-xl shadow-lg border-solid border-[1px] border-[#ddd] max-w-md w-full',
          theme ? 'bg-white' : 'bg-background-card-dark',
        )}
      >
        <div className='mb-6'>
          <h1
            className={clsx(
              'text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-main-color to-pink-500 mb-4',
              theme ? 'text-secondary-text' : 'text-text-light',
            )}
          >
            Oops! Something went wrong...
          </h1>
          <p
            className={clsx(
              'text-lg mb-4',
              theme ? 'text-gray-600' : 'text-text-light',
            )}
          >
            We're sorry, but the page you're looking for doesn't exist.
          </p>
        </div>
        <div className='flex justify-center gap-6'>
          <button
            onClick={handleGoHome}
            className={clsx(
              'px-8 py-3 cursor-pointer font-bold text-base border-none rounded-lg text-white shadow-md transition-all ease hover:scale-105 focus:scale-105 active:scale-95 duration-300',
              theme
                ? 'bg-[linear-gradient(145deg,#3498db,#2980b9)] hover:bg-[linear-gradient(145deg,#2980b9,#3498db)] focus:bg-[linear-gradient(145deg,#2980b9,#3498db)]'
                : 'bg-[linear-gradient(145deg,#1f618d,#1a5276)] hover:bg-[linear-gradient(145deg,#1a5276,#1f618d)] focus:bg-[linear-gradient(145deg,#1a5276,#1f618d)]',
            )}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};
