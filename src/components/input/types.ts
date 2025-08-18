import { InputHTMLAttributes, ReactNode } from 'react';
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  suffix?: ReactNode;
  disabled?: boolean;
  label?: string;
  type?: string;
  value: string;
  theme?: 'light' | 'dark';
  onChange: (value: string) => void; // оставляем типизацию как строку
  error?: string;
  placeholder?: string;
  onBlur?: VoidFunction;
  onFocus?: VoidFunction;
  onSubmit?: VoidFunction;
  name?: string;
  isEdit?: boolean;
}
