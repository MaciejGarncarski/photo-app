import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

import { useFinalImages } from '@/src/hooks/useFinalImages';
import { useModal } from '@/src/hooks/useModal';
import { convertToBlob } from '@/src/utils/convertToBlob';

import { useCropState } from '@/src/components/organisms/cropImage/useCropState';

export const useCropImage = () => {
  const { finalImages, setFinalImages } = useFinalImages();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { openModal, closeModal, isModalOpen } = useModal();
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

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onConfirm = () => {
    closeModal();
    resetState();
  };

  return {
    saveCrop,
    onCropComplete,
    zoom,
    error,
    setError,
    isIdle,
    setZoom,
    onConfirm,
    onChange,
    setCropArea,
    imgSrc,
    isModalOpen,
    setImgSrc,
    openModal,
    cropArea,
    closeModal,
  };
};
