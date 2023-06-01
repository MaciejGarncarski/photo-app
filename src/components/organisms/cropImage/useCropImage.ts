import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

export const useCropImage = () => {
  const [aspect, setAspect] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropAreaPixels, setCropAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropAreaPixels(croppedAreaPixels);
    },
    [],
  );

  return {
    aspect,
    setAspect,
    zoom,
    setZoom,
    crop,
    setCrop,
    cropAreaPixels,
    onCropComplete,
  };
};
