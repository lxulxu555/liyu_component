import classNames from 'classnames';
import { Icon } from '../Icon/icon';
import { InputProps } from './type';

export const Input = ({ disabled, size, icon, prepend, append, style, ...restProps }: InputProps) => {
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  });

  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend-wrapper">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon name={icon} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append-wrapper">{append}</div>}
    </div>
  );
};

export default Input;
