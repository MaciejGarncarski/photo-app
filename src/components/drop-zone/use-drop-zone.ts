import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { handleDropImage } from '@/src/utils/handle-drop-image';

import { DropZoneErrors } from '@/src/components/pages/create-post/types';

type Arguments = {
  setError: (error: DropZoneErrors) => void;
  setImgSrc: (image: string | null) => void;
};

export const useDropZone = ({ setError, setImgSrc }: Arguments) => {
  const [isActive, setIsActive] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
    if (!changeEv.target.files) {
      setError('NO_IMAGE_DETECTED');
      return;
    }

    if (changeEv.target.files.length > 0) {
      setIsUploadingImage(true);

      handleDropImage({ file: changeEv.target.files[0], setError, setImgSrc });
      setIsUploadingImage(false);
    }
  };

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
    const {
      dataTransfer: { files },
    } = dropEv;

    const firstFile = files[0];

    if (!files || !firstFile) {
      return setError('NO_IMAGE_DETECTED');
    }

    if (files.length > 1) {
      return setError('TOO_MANY_IMAGES');
    }

    setIsUploadingImage(true);
    handleDropImage({ file: firstFile, setError, setImgSrc });
  };

  return {
    active,
    inactive,
    onDrop,
    isActive,
    inputRef,
    isUploadingImage,
    onChange,
  };
};
