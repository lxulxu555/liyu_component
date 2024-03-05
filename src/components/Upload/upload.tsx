import { useRef, useState } from 'react';
import { Button } from '../Button/button';
import { UploadFile, UploadProps } from './type';
import axios from 'axios';
import { UploadList } from './uploadList';
import { v4 as uuidv4 } from 'uuid';

export const Upload = ({ action, onError, onProgress, onSuccess, beforeUpload, onChange, defaultFileList, onRemove }: UploadProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    // if (fileInput.current) {
    //   fileInput.current.value = '';
    // }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: uuidv4(),
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / (e?.total ?? 0)) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp, file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        if (onError) {
          onError(err, file);
        }
      })
      .finally(() => {
        if (onChange) {
          onChange(file);
        }
      });
  };

  return (
    <div>
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
