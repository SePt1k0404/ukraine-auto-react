import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IFormFieldProps } from './FormField.interface';
import styles from './FormField.module.css';

export const FormField = ({
  id,
  label,
  type,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: IFormFieldProps) => {
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

  return (
    <div className={!theme ? styles.dark : ''}>
      <div className={styles.formGroup}>
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.formInput}
        />
        {touched && error && <div className={styles.errorText}>{error}</div>}
      </div>
    </div>
  );
};
