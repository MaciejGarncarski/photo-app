import { IconCircleX, IconPhoto } from '@tabler/icons';
import clsx from 'clsx';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { handleDropImage } from '@/utils/handleDropImage';

import { CropError } from '@/components/atoms/cropError/CropError';
import { Heading } from '@/components/atoms/heading/Heading';
import { ImageCropErrors } from '@/components/molecules/cropImage/CropImage';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';

import styles from './dropZone.module.scss';

type DropZoneProps = {
  onChange: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
  error: ImageCropErrors;
  setError: (error: ImageCropErrors) => void;
};

export const DropZone = ({ onChange, setImgSrc, setError, error }: DropZoneProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenWidth();

  const active = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(true);
  };

  const inactive = (dragEv: DragEvent<HTMLDivElement>) => {
    dragEv.preventDefault();
    setIsActive(false);
  };

  const onDrop = (dropEv: DragEvent<HTMLDivElement>) => {
    inactive(dropEv);
    const { dataTransfer } = dropEv;

    const file = dataTransfer.files[0];

    if (!dataTransfer.files || !file) {
      setError('NO_IMAGE_DETECTED');
      return;
    }
    if (dataTransfer.files.length > 1) {
      setError('TOO_MANY_IMAGES');
      return;
    }

    handleDropImage({ file, setError, setImgSrc });
  };

  return (
    <>
      <Heading tag="h2">Upload image</Heading>
      <div
        className={clsx(isActive && styles.dropZoneActive, error && styles.dropZoneError, styles.dropZone)}
        onDragOver={active}
        onDragEnter={active}
        onDrop={onDrop}
        onDragLeave={inactive}
        data-testid="dropZoneContainer"
      >
        <input
          data-testid="fileInput"
          type="file"
          id="dropZoneInput"
          accept="image/*"
          className={clsx('visually-hidden', styles.input)}
          ref={inputRef}
          onChange={onChange}
        />

        <div className={styles.dropZoneState}>
          {isActive && (
            <>
              <IconPhoto className={styles.dropIcon} />
              <p>Drop here.</p>
            </>
          )}

          {!error && !isActive && (
            <>
              <IconPhoto className={styles.dropIcon} />
              <p>Drag photo here.</p>
            </>
          )}
          {error && !isActive && (
            <>
              <IconCircleX className={styles.dropIconError} />
              <CropError errorType={error} />
            </>
          )}
        </div>
        <label htmlFor="dropZoneInput" className={clsx(isActive && styles.buttonInputDisabled, styles.buttonInput)}>
          Select from {isMobile ? 'device' : 'computer'}
        </label>
      </div>
    </>
  );
};
