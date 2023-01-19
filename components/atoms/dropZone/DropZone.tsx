import { IconCircleX, IconDownload, IconFolderPlus } from '@tabler/icons';
import clsx from 'clsx';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';

import { handleDropImage } from '@/utils/handleDropImage';

import styles from './dropZone.module.scss';

import { CropError } from '@/components/atoms/cropError/CropError';
import { Heading } from '@/components/atoms/heading/Heading';
import { ImageCropErrors } from '@/components/molecules/cropImage/CropImage';

type DropZoneProps = {
  handleImage: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
  error: ImageCropErrors;
  setError: (error: ImageCropErrors | null) => void;
};

export const DropZone = ({ handleImage, setImgSrc, setError, error }: DropZoneProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
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
    (dropEv: DragEvent<HTMLDivElement>) => {
      const dt = dropEv.dataTransfer;
      if (!dt.files || !dt.files[0]) {
        setError('NO_IMAGE_DETECTED');
        return;
      }
      if (dt.files.length > 1) {
        setError('TOO_MANY_IMAGES');
        return;
      }
      const file = dt.files[0];
      handleDropImage({ file, setError, setImgSrc });
    },
    [setError, setImgSrc],
  );

  const openInput = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <>
      <Heading tag="h2">Upload image</Heading>
      <input
        data-testid="fileInput"
        type="file"
        accept="image/*"
        className={clsx('visually-hidden', styles.input)}
        ref={inputRef}
        onChange={handleImage}
      />

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
        className={clsx(isActive && styles.dropZoneActive, error && styles.dropZoneError, styles.dropZone)}
      >
        {isActive && (
          <>
            <IconFolderPlus className={styles.dropIcon} />
            <p>Drop here 👌</p>
          </>
        )}

        {!error && !isActive && (
          <>
            <IconDownload className={styles.dropIcon} />
            <p>Drop or click to add image.</p>
          </>
        )}

        {error && !isActive && (
          <>
            <IconCircleX className={styles.dropIconError} />
            <CropError errorType={error} />
          </>
        )}
      </div>
    </>
  );
};
