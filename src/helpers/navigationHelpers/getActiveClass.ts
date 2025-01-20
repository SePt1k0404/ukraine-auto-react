import { Location } from 'react-router-dom';

export const getActiveClass = (location: Location, path: string): string => {
  if (location.pathname === path) {
    return 'active';
  } else {
    return '';
  }
};
