import { ChangeEvent, useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';
import { v4 } from 'uuid';

import { useIsCropping } from '@/hooks/useIsCropping';
import { convertToBlob } from '@/utils/convertToBlob';
import { handleDropImage } from '@/utils/handleDropImage';

import { FinalImages } from '@/components/pages/createPost/types';

export type ImageCropErrors =
  | null
  | 'DIMENSIONS'
  | 'FILE_SIZE'
  | 'INVALID_TYPE'
  | 'NO_IMAGE_DETECTED'
  | 'TOO_MANY_IMAGES';

type ArgumentsTypes = {
  setFinalImages: (finalImg: FinalImages) => void;
  setIsIdle: (val: boolean) => void;
  setError: (val: ImageCropErrors) => void;
  setImgSrc: (val: string | null) => void;
  resetState: () => void;
  finalImages: FinalImages;
  imgSrc: string | null;
};

export const useCropImage = ({
  setFinalImages,
  finalImages,
  setError,
  setImgSrc,
  setIsIdle,
  imgSrc,
  resetState,
}: ArgumentsTypes) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const { setIsCropping } = useIsCropping();

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCrop = async () => {
    setIsIdle(true);
    if (croppedAreaPixels && imgSrc) {
      const blob = await convertToBlob(imgSrc, croppedAreaPixels);
      const imageId = v4();

      setFinalImages([
        ...finalImages,
        {
          file: blob,
          id: imageId,
        },
      ]);
      setIsIdle(false);
      resetState();
    }
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
    saveCrop,
    onCropComplete,
    onChange,
  };
};
