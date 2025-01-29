import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';

export type PrivateRoutsProps = RouteProps & {
  element: ReactElement;
};
