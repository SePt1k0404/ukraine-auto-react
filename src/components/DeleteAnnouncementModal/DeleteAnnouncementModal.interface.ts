import { MouseEvent } from 'react';

export interface IDeleteAnnouncementModalProps {
  onClose: () => void;
  handleRemoveClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
