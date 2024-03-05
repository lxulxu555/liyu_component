import classNames from 'classnames';
import { UploadFile, UploadListProps } from './type';
import { Icon } from '../Icon/icon';
import { useEffect, useRef } from 'react';

export const UploadList = ({ fileList, onRemove }: UploadListProps) => {
  return (
    <ul
      className={classNames('upload-list', {
        hidden: fileList.length === 0,
      })}
    >
      {fileList.map((item) => {
        return <UploadListItem key={item.uid} item={item} onRemove={onRemove} />;
      })}
    </ul>
  );
};

const UploadListItem = ({ item, onRemove }: { item: UploadFile; onRemove: (file: UploadFile) => void }) => {
  const refItem = useRef<HTMLLIElement>(null);

  useEffect(() => {
    refItem.current?.classList.add('visible');
  }, []);

  const remove = () => {
    if (onRemove) {
      onRemove(item);
    }
  };

  const handleRemove = () => {
    if (refItem.current) {
      refItem.current.addEventListener('animationend', remove, {
        once: true,
      });
    }
    refItem.current?.classList.add('hidden');
  };

  return (
    <li
      ref={refItem}
      key={item.uid}
      className={classNames('upload-list-item', {
        success: item.status === 'success',
        error: item.status === 'error',
      })}
    >
      {(item.status === 'ready' || item.status === 'uploading') && <Icon name="loader-2" spin size={16} />}
      {item.status === 'success' && <Icon name="check" size={16} />}
      {item.status === 'error' && <Icon name="frown" size={16} />}
      <span className="upload-list-item-title">{item.name}</span>
      <Icon name="x" size={16} className="upload-list-item-close" onClick={handleRemove} />
    </li>
  );
};
