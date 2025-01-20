import clsx from 'clsx';
import { IButton } from './Button.interface';
import styles from './Button.module.css';

export const Button = ({ children, className }: IButton) => {
  return (
    <button className={clsx(styles['button'], className)}>{children}</button>
  );
};
