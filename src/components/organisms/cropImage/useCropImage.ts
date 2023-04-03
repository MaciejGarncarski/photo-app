import { useState } from 'react';

import { useFinalImages } from '@/src/hooks/useFinalImages';
import { convertToBlob } from '@/src/utils/convertToBlob';

import { useCrop } from '@/src/components/organisms/cropImage/useCrop';
import { useCropState } from '@/src/components/organisms/cropImage/useCropState';

export const useCropImage = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [zoom, setZoom] = useState(1);
  const { finalImages, setFinalImages } = useFinalImages();
  const { croppedAreaPixels, onCropComplete } = useCrop();
  const { error, imgSrc, resetState, onChange, setCropArea, setError, setImgSrc, cropArea } = useCropState();

  const saveCrop = async () => {
    setIsIdle(true);
    if (croppedAreaPixels && imgSrc) {
      const blob = await convertToBlob(imgSrc, croppedAreaPixels);
      const imageId = Math.random();

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

  return {
    saveCrop,
    resetState,
    onCropComplete,
    zoom,
    error,
    setError,
    isIdle,
    setZoom,
    onChange,
    cropArea,
    setCropArea,
    imgSrc,
    setImgSrc,
    aspectRatio,
    setAspectRatio,
  };
};
