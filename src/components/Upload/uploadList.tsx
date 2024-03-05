import classNames from 'classnames';
import { UploadListProps } from './type';
import { Icon } from '../Icon/icon';

export const UploadList = ({ fileList, onRemove }: UploadListProps) => {
  return (
    <ul
      className={classNames('upload-list', {
        hidden: fileList.length === 0,
      })}
    >
      {fileList.map((item) => {
        return (
          <li
            key={item.uid}
            className={classNames('upload-list-item', {
              success: item.status === 'success',
              error: item.status === 'error',
            })}
          >
            {item.status === 'uploading' && <Icon name="loader-2" spin size={16} />}
            {item.status === 'success' && <Icon name="check" size={16} />}
            {item.status === 'error' && <Icon name="frown" size={16} />}
            <span className="upload-list-item-title">{item.name}</span>
            <Icon name="x" size={16} className="upload-list-item-close" onClick={() => onRemove(item)} />
          </li>
        );
      })}
    </ul>
  );
};
