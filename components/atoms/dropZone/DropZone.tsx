import { IconCircleX, IconPhoto } from '@tabler/icons';
import clsx from 'clsx';
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';

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
  setError: (error: ImageCropErrors | null) => void;
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

  const onDrop = useCallback(
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

  return (
    <>
      <Heading tag="h2">Upload image</Heading>
      <div
        className={clsx(isActive && styles.dropZoneActive, error && styles.dropZoneError, styles.dropZone)}
        onDragOver={active}
        onDragEnter={active}
        onDrop={(dragEv) => {
          inactive(dragEv);
          onDrop(dragEv);
        }}
        onDragLeave={inactive}
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
