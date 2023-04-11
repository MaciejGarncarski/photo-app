import { IconCircleX, IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';

import { useIsMobile } from '@/src/hooks/useIsMobile';

import { CropError } from '@/src/components/atoms/cropError/CropError';
import { Heading } from '@/src/components/atoms/heading/Heading';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { useDropError } from '@/src/components/organisms/dropZone/useDropError';
import { useDropZone } from '@/src/components/organisms/dropZone/useDropZone';

import styles from './DropZone.module.scss';

type PropsTypes = {
  setImgSrc: (src: string | null) => void;
};

export const DropZone = ({ setImgSrc }: PropsTypes) => {
  const { error, changeError } = useDropError();
  const { isMobile } = useIsMobile();
  const { active, onDrop, inactive, inputRef, isActive, onChange, isUploadingImage } = useDropZone({
    changeError,
    setImgSrc,
  });

  if (isUploadingImage) {
    return <Loader color="blue" size="normal" />;
  }

  return (
    <div>
      <Heading tag="h2" size="medium">
        Upload image
      </Heading>
      <div
        className={clsx(isActive && styles.dropZoneActive, error && styles.dropZoneError, styles.dropZone)}
        onDragOver={active}
        onDragEnter={active}
        onDrop={onDrop}
        onDragLeave={inactive}
        data-testid="dropZoneContainer"
      >
        <VisuallyHidden>
          <input
            type="file"
            id="dropZoneInput"
            accept="image/*"
            className={clsx('visually-hidden', styles.input)}
            ref={inputRef}
            onChange={onChange}
          />
        </VisuallyHidden>

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
    </div>
  );
};
