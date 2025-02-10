import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix?: ReactNode;
  disabled?: boolean;
  label?: string;
  type?: string;
  value: string;
  theme?: 'light' | 'dark';
  _onChange: (e: string) => void;
  error?: string;
  placeholder?: string;
  onBlur?: VoidFunction;
  onFocus?: VoidFunction;
  onSubmit?: VoidFunction;
  name: string;
}
