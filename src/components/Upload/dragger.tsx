import { useState, DragEvent, useRef } from 'react';
import { DraggerProps } from './type';
import classNames from 'classnames';
import { Icon } from '../Icon/icon';

export const Dragger = ({ onFile }: DraggerProps) => {
  const draggerRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const classes = classNames('dragger', {
    'is-dragover': dragOver,
  });

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  return (
    <div
      ref={draggerRef}
      className={classes}
      onDragEnter={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        if (e.relatedTarget === draggerRef.current || Array.from(draggerRef.current?.children || []).includes(e.relatedTarget as Element)) {
          return;
        }
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      <Icon name="upload" size="36" />
      <span>Click or drag file to this area to upload</span>
      <span className="dragger-text">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </span>
    </div>
  );
};
