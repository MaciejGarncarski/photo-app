import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

import { useSaveCrop } from '@/components/crop-image/use-save-crop';
import { FinalImages } from '@/components/pages/create-post/create-post-schema';

type Props = {
  resetImgSrc: () => void;
  imgSrc: string | null;
  finalImages: FinalImages;
  setFinalImages: (final: FinalImages) => void;
};

export const useCropImage = ({
  finalImages,
  imgSrc,
  resetImgSrc,
  setFinalImages,
}: Props) => {
  const [aspect, setAspect] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropAreaPixels, setCropAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCropAreaPixels(croppedAreaPixels);
  }, []);

  const { isCropping, saveCrop } = useSaveCrop({
    cropAreaPixels,
    finalImages,
    imgSrc,
    resetImgSrc,
    setFinalImages,
  });

  return {
    aspect,
    setAspect,
    zoom,
    setZoom,
    crop,
    setCrop,
    onCropComplete,
    isCropping,
    saveCrop,
  };
};
