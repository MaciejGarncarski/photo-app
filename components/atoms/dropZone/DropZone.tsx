import clsx from 'clsx';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';

import styles from './dropZone.module.scss';

import { ImageErrors } from '@/components/molecules/cropPostImage/CropPostImage';

type DropZoneProps = {
  handleImage: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
  setError: (error: ImageErrors | null) => void;
};

const IMAGE_MIN_SIZE = 500;
const IMAGE_MAX_FILE_SIZE = 36_700_160;

export const DropZone = ({ handleImage, setImgSrc, setError }: DropZoneProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const active = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(true);
  };

  const inactive = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(false);
  };

  const handleDrop = useCallback(
    (dragEv: DragEvent<HTMLDivElement>) => {
      const dt = dragEv.dataTransfer;
      if (!dt?.files) {
        return;
      }
      const file = dt.files[0];
      const reader = new FileReader();
      console.log(file.size);
      if (file.size > IMAGE_MAX_FILE_SIZE) {
        setError('FILE_SIZE');
        return;
      }

      reader.addEventListener('load', () => {
        const image = new Image();
        image.onload = () => {
          if (image.width < IMAGE_MIN_SIZE || image.height < IMAGE_MIN_SIZE) {
            setError('DIMENSIONS');
            return;
          }
          setImgSrc(reader.result?.toString() || '');
          setFileName(file.name);
        };
        image.src = URL.createObjectURL(file);
      });
      reader.readAsDataURL(file);
      setError(null);
    },
    [setError, setImgSrc]
  );

  const openInput = () => {
    if (!inputRef.current || fileName) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <div
      onClick={openInput}
      onDragOver={active}
      onDragEnter={active}
      onDrop={(dragEv) => {
        inactive(dragEv);
        handleDrop(dragEv);
      }}
      onDragLeave={inactive}
      ref={dropZoneRef}
      className={clsx(isActive && styles.dropZoneActive, styles.dropZone)}
    >
      <AiOutlineDownload className={styles.dropIcon} />
      <p>Drop or click to add image.</p>
      {fileName && <p>{fileName}</p>}
      <input
        type='file'
        accept='image/*'
        className='visually-hidden'
        ref={inputRef}
        onChange={handleImage}
      />
    </div>
  );
};
