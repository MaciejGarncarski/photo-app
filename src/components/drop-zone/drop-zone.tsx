import { Camera, File, X } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useId, useState } from 'react';

import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { Button } from '@/src/components/buttons/button/button';
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
  const inputId = useId();
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
        Upload image
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
            id={inputId}
            accept="image/*"
            className={styles.input}
            ref={inputRef}
            name="fileInput"
            onChange={onChange}
          />
        </span>

        <div className={styles.dropZoneState}>
          {isActive && (
            <>
              <Camera size={40} />
              <p>Drop here.</p>
            </>
          )}

          {!error && !isActive && (
            <>
              <Camera size={40} />
              {isMobile ? <p>Add image here.</p> : <p>Drag photo here.</p>}
            </>
          )}
          {error && !isActive && (
            <>
              <X className={styles.dropIconError} />
              <CropError errorType={error} />
            </>
          )}
        </div>
        <Button type="button" variant="primary">
          <File />
          <label htmlFor={inputId}>Select file from device</label>
        </Button>
      </div>
    </div>
  );
};
