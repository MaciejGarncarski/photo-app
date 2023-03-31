import { IconCircleX, IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';

import { CropError } from '@/components/atoms/cropError/CropError';
import { Heading } from '@/components/atoms/heading/Heading';
import { ImageCropErrors } from '@/components/molecules/cropImage/useCropImage';
import { useDropZone } from '@/components/molecules/dropZone/useDropZone';

import styles from './dropZone.module.scss';

type PropsTypes = {
  onChange: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string | null) => void;
  error: ImageCropErrors;
  setError: (error: ImageCropErrors) => void;
};

export const DropZone = ({ onChange, setImgSrc, setError, error }: PropsTypes) => {
  const { active, onDrop, inactive, inputRef, isActive } = useDropZone({ setError, setImgSrc });
  const { isMobile } = useScreenWidth();

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
              {isMobile ? <p>Add image here.</p> : <p>Drag photo here.</p>}
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
