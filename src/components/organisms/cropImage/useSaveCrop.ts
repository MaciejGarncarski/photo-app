import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

import { convertToBlob } from '@/src/utils/convertToBlob';

import { FinalImages } from '@/src/components/pages/createPost/types';

type Arguments = {
  resetImgSrc: () => void;
  imgSrc: string | null;
  finalImages: FinalImages;
  setFinalImages: (final: FinalImages) => void;
  cropAreaPixels: Area;
};

export const useSaveCrop = ({ setFinalImages, finalImages, imgSrc, cropAreaPixels, resetImgSrc }: Arguments) => {
  const [isCropping, setIsCropping] = useState(false);

  const saveCrop = useCallback(async () => {
    setIsCropping(true);
    if (cropAreaPixels && imgSrc) {
      const blob = await convertToBlob(imgSrc, cropAreaPixels);
      const imageId = crypto.randomUUID();

      if (!blob) {
        return;
      }

      setFinalImages([
        ...finalImages,
        {
          file: blob,
          id: imageId,
        },
      ]);

      resetImgSrc();
      setIsCropping(false);
    }
  }, [cropAreaPixels, finalImages, imgSrc, resetImgSrc, setFinalImages]);

  return { isCropping, saveCrop };
};
