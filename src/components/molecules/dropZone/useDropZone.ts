import { DragEvent, useRef, useState } from 'react';

import { useIsCropping } from '@/hooks/useIsCropping';
import { handleDropImage } from '@/utils/handleDropImage';

import { ImageCropErrors } from '@/components/molecules/cropImage/useCropImage';

type ArgumentsTypes = {
  setError: (error: ImageCropErrors) => void;
  setImgSrc: (image: string | null) => void;
};

export const useDropZone = ({ setError, setImgSrc }: ArgumentsTypes) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setIsCropping } = useIsCropping();
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
    const {
      dataTransfer: { files },
    } = dropEv;

    const firstFile = files[0];

    if (!files || !firstFile) {
      setError('NO_IMAGE_DETECTED');
      return;
    }

    if (files.length > 1) {
      setError('TOO_MANY_IMAGES');
      return;
    }

    setIsCropping(true);
    handleDropImage({ file: firstFile, setError, setImgSrc });
  };

  return { active, inactive, onDrop, isActive, inputRef };
};
