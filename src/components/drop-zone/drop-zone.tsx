import { IconCircleX, IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';
import { useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { CropError } from '@/src/components/crop-error/crop-error';
import { useDropZone } from '@/src/components/drop-zone/use-drop-zone';
import { Loader } from '@/src/components/loader/loader';
import { DropZoneErrors } from '@/src/components/pages/create-post/types';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './drop-zone.module.scss';

type Props = {
  setImgSrc: (src: string | null) => void;
};

export const DropZone = ({ setImgSrc }: Props) => {
  const [error, setError] = useState<DropZoneErrors>(null);

  const { isMobile } = useIsMobile();

  const {
    active,
    onDrop,
    inactive,
    inputRef,
    isActive,
    onChange,
    isUploadingImage,
  } = useDropZone({
    setError,
    setImgSrc,
  });

  if (isUploadingImage) {
    return <Loader color="blue" size="normal" />;
  }

  return (
    <div>
      <Heading tag="h2" size="medium">
        1. Upload image
      </Heading>
      <div
        className={clsx(
          isActive && styles.dropZoneActive,
          error && styles.dropZoneError,
          styles.dropZone,
        )}
        onDragOver={active}
        onDragEnter={active}
        onDrop={onDrop}
        onDragLeave={inactive}
        data-testid="dropZoneContainer"
      >
        <span className="visually-hidden">
          <input
            type="file"
            id="dropZoneInput"
            accept="image/*"
            className={clsx('visually-hidden', styles.input)}
            ref={inputRef}
            onChange={onChange}
          />
        </span>

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
        <label
          htmlFor="dropZoneInput"
          className={clsx(
            isActive && styles.buttonInputDisabled,
            styles.buttonInput,
          )}
        >
          Select from {isMobile ? 'device' : 'computer'}
        </label>
      </div>
    </div>
  );
};
