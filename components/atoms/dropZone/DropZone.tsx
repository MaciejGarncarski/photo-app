import clsx from 'clsx';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineFolderOpen } from 'react-icons/ai';

import { handleDrop } from '@/utils/handleDrop';

import styles from './dropZone.module.scss';

import { DropZoneContainer } from '@/components/atoms/dropZoneContainer/DropZoneContainer';
import { ImageErrors } from '@/components/molecules/cropImage/CropImage';

type DropZoneProps = {
  onChange: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
  setError: (error: ImageErrors | null) => void;
};

export const DropZone = ({ onChange, setImgSrc, setError }: DropZoneProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    if (!inputRef.current || fileName) {
      return;
    }
    inputRef.current.click();
  };

  const active = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(true);
  };

  const inactive = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(false);
  };

  const onDrop = (dropEvent: DragEvent<HTMLDivElement>) => {
    if (!dropEvent) {
      return;
    }
    inactive(dropEvent);
    const { dataTransfer } = dropEvent;
    const files = [...dataTransfer.files];
    handleDrop({ setError, files, setFileName, setImgSrc });
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        className={clsx('visually-hidden', styles.input)}
        ref={inputRef}
        onChange={onChange}
        data-testid='fileInput'
      />

      <DropZoneContainer
        ref={dropZoneRef}
        onClick={handleInputClick}
        onDragOver={active}
        onDragEnter={active}
        onDrop={onDrop}
        onDragLeave={inactive}
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
      </DropZoneContainer>
    </>
  );
};
