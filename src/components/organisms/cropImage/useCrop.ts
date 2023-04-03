import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

export const useCrop = () => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return { croppedAreaPixels, setCroppedAreaPixels, onCropComplete };
};
