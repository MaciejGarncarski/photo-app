import { DragEvent, useRef, useState } from 'react';

import { handleDropImage } from '@/utils/handleDropImage';

import { ImageCropErrors } from '@/components/molecules/cropImage/useCropImage';

type ArgumentsTypes = {
  setError: (error: ImageCropErrors) => void;
  setImgSrc: (image: string | null) => void;
};

export const useDropZone = ({ setError, setImgSrc }: ArgumentsTypes) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return { active, inactive, onDrop, isActive, inputRef };
};
