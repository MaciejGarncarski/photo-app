import clsx from 'clsx';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineFolderOpen } from 'react-icons/ai';

import { handleDropImage } from '@/utils/handleDropImage';

import styles from './dropZone.module.scss';

import { ImageErrors } from '@/components/molecules/cropPostImage/CropPostImage';

type DropZoneProps = {
  handleImage: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
  setError: (error: ImageErrors | null) => void;
};

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
      handleDropImage({ file, setError, setFileName, setImgSrc });
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
      {isActive ? (
        <>
          <AiOutlineFolderOpen className={styles.dropIcon} />
          <p>Drop here 👌</p>
        </>
      ) : (
        <>
          <AiOutlineDownload className={styles.dropIcon} />
          <p>Drop or click to add image.</p>
        </>
      )}
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
