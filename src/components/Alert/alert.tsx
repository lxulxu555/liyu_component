import classNames from 'classnames';
import { useState } from 'react';
import { AlertProps } from './type';
import { Icon } from '../Icon/icon';

export const Alert = ({ className, type = 'default', title, description, closable = false, onClose }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  });

  const handleClose = () => {
    setShowAlert(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {showAlert && (
        <div className={classes}>
          <div className="alert-content">
            <span
              className={classNames('alert-title', {
                bold: description,
              })}
            >
              {title}
            </span>
            {description && <div className="alert-desc">{description}</div>}
          </div>

          {closable && <Icon className="alert-close" name="x" onClick={handleClose} />}
        </div>
      )}
    </>
  );
};
