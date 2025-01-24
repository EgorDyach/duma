import { ReactNode } from 'react';

export type InputProps = {
  suffix?: ReactNode;
  disabled?: boolean;
  label?: string;
  type?: string;
  value: string;
  theme?: 'light' | 'dark';
  onChange: (e: string) => void;
  error?: string;
  placeholder?: string;
  onBlur?: VoidFunction;
  onFocus?: VoidFunction;
  onSubmit?: VoidFunction;
  name: string;
};
