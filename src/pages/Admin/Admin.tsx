import { AddNewCarForm } from '../../components/AddNewCarForm/AddNewCarForm';

export const Admin = () => {
  return (
    <div className='p-6 max-w mx-auto bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Your Cars Panel</h1>
      <div className='mt-6 bg-white p-4 shadow-md rounded'>
        <h2 className='text-xl font-semibold mb-4'>Add a New Car</h2>
        <AddNewCarForm />
      </div>
      <div className='bg-white p-4 shadow-md rounded'>
        <h2 className='text-xl font-semibold mb-4'>Car Listings</h2>
        <ul className='border border-gray-300 rounded p-2 min-h-[200px]'>
          {/* Car items will go here */}
        </ul>
      </div>
    </div>
  );
};
