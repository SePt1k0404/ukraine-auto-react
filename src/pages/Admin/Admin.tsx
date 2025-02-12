import { useSelector } from 'react-redux';
import { AddNewCarForm } from '../../components/AddNewCarForm/AddNewCarForm';
import { AdminCarList } from '../../components/AdminCarList/AdminCarList';
import { RootState } from '../../app/store';
import clsx from 'clsx';

export const Admin = () => {
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

  return (
    <div
      className={clsx(
        'p-6 max-w mx-auto min-h-screen transition-colors duration-300',
        {
          'bg-gray-100 text-gray-800': theme,
          'bg-background-dark text-text-light': !theme,
        },
      )}
    >
      <h1 className='text-3xl font-bold mb-6 text-center'>Your Cars Panel</h1>

      <div
        className={clsx('mt-6 p-4 shadow-md rounded transition-colors', {
          'bg-white': theme,
          'bg-gray-800': !theme,
        })}
      >
        <h2 className='text-xl font-semibold mb-4'>Add a New Car Announce</h2>
        <AddNewCarForm />
      </div>

      <div
        className={clsx('p-4 shadow-md rounded mt-3 transition-colors', {
          'bg-white': theme,
          'bg-gray-800': !theme,
        })}
      >
        <h2 className='text-xl font-semibold mb-4'>Your's Car Listings</h2>
        <AdminCarList />
      </div>
    </div>
  );
};
