import classNames from 'classnames';
import { InputProps } from './type';
import { Icon } from '../Icon/icon';
import { useRef, useState } from 'react';

export const Input = ({ size, icon, prepend, append, className = '', onFocus, onBlur, disabled = false, ...props }: InputProps) => {
  const [isFocues, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const classes = classNames('input-wrapper', {
    [`input-${size}`]: size,
    'input-focus': isFocues,
    'input-disabled': disabled,
    'input-group': prepend || append,
    [className]: !!className,
  });

  const onWrapperClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={classes} onClick={onWrapperClick}>
      {prepend && <div className="input-prepend">{prepend}</div>}
      <input {...props} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} disabled={disabled} />
      {icon && <Icon name={icon} className="input-icon" />}
    </div>
  );
};
