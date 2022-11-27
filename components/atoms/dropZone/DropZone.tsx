import clsx from 'clsx';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';

import styles from './dropZone.module.scss';

type DropZoneProps = {
  handleImage: (changeEv: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (src: string) => void;
};

const activeEvents = ['dragenter', 'dragover'] as const;
const inactiveEvents = ['dragleave', 'drop'] as const;
const events = [...activeEvents, ...inactiveEvents];

export const DropZone = ({ handleImage, setImgSrc }: DropZoneProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (dragEv: DragEvent) => {
      const dt = dragEv.dataTransfer;
      if (!dt?.files) {
        return;
      }
      const files = dt.files;
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(files[0]);
      setFileName(files[0].name);
    },
    [setImgSrc]
  );

  const openInput = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  useEffect(() => {
    if (!dropZoneRef.current) {
      return;
    }

    const active = () => {
      setIsActive(true);
    };

    const inactive = () => {
      setIsActive(false);
    };

    const dropZone = dropZoneRef.current;
    const prevent = (e: Event) => e.preventDefault();
    events.forEach((ev) => {
      dropZone.addEventListener(ev, prevent);
    });

    activeEvents.forEach((ev) => {
      dropZone.addEventListener(ev, active);
    });

    inactiveEvents.forEach((ev) => {
      dropZone.addEventListener(ev, inactive);
    });

    dropZone.addEventListener('click', openInput);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      events.forEach((ev) => {
        dropZone.removeEventListener(ev, prevent);
      });

      activeEvents.forEach((ev) => {
        dropZone.removeEventListener(ev, active);
      });

      inactiveEvents.forEach((ev) => {
        dropZone.removeEventListener(ev, inactive);
      });

      dropZone.removeEventListener('drop', handleDrop);
      dropZone.removeEventListener('click', openInput);
    };
  }, [handleDrop]);

  return (
    <div ref={dropZoneRef} className={clsx(isActive && styles.dropZoneActive, styles.dropZone)}>
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
