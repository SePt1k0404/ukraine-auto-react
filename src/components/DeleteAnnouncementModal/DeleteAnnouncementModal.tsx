import { MouseEvent } from 'react';
import { IDeleteAnnouncementModalProps } from './DeleteAnnouncementModal.interface';

export const DeleteAnnouncementModal = ({
  onClose,
  handleRemoveClick,
}: IDeleteAnnouncementModalProps) => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
      }}
    >
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
        <p className='text-gray-700 mb-6'>
          Are you sure you want to delete this car announcement? This action
          cannot be undone.
        </p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClose();
            }}
            className='px-4 py-2 rounded bg-main-color text-white hover:bg-main-color-dark transition'
          >
            Cancel
          </button>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleRemoveClick(e);
            }}
            className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
