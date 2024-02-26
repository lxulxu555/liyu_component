import { InputHTMLAttributes } from 'react';
import { IconName } from '../Icon/icon';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  size?: 'lg' | 'sm';
  icon?: IconName;
  prepend?: string | React.ReactNode;
  append?: string | React.ReactNode;
  className?: string;
}
