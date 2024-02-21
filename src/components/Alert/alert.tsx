import classNames from 'classnames';
import closeIcon from '../../assets/close.svg';
import { useState } from 'react';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, type, title, description, closable, onClose } = props;
  const [showAlert, setShowAlert] = useState(true);
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  });

  const handleClose = () => {
    setShowAlert(false);
    onClose && onClose();
  };

  return (
    <>
      {showAlert && (
        <div className={classes}>
          <span className={classNames('alert-title', description && 'bold-title')}>{title}</span>
          <p className="alert-desc">{description}</p>
          {closable && (
            <span className="alert-close" onClick={handleClose}>
              <img src={closeIcon} alt="close" />
            </span>
          )}
        </div>
      )}
    </>
  );
};

Alert.defaultProps = {
  type: AlertType.Default,
  closable: false,
};

export default Alert;
