import { ChangeEvent, useState } from 'react';

import { useIsCropping } from '@/src/hooks/useIsCropping';
import { handleDropImage } from '@/src/utils/handleDropImage';

export type ImageCropErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

export const useCropState = () => {
  const { setIsCropping } = useIsCropping();
  const [cropArea, setCropArea] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<ImageCropErrors>(null);

  const resetState = () => {
    setImgSrc(null);
    setCropArea({ x: 0, y: 0 });
    setError(null);
    setIsCropping(false);
  };

  const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
    resetState();

    if (!changeEv.target.files) {
      setError('NO_IMAGE_DETECTED');
      return;
    }

    if (changeEv.target.files.length > 0) {
      setIsCropping(true);
      handleDropImage({ file: changeEv.target.files[0], setError, setImgSrc });
    }
  };

  return {
    onChange,
    error,
    setError,
    setImgSrc,
    imgSrc,
    resetState,
    setCropArea,
    cropArea,
  };
};
