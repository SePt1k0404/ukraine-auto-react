import { ChangeEvent, FocusEvent } from 'react';

export interface IFormFieldProps {
  id: string;
  label: string;
  type: string;
  value?: string | number | File;
  error?: string;
  touched?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}
