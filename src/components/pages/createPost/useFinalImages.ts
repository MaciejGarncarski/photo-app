import { useState } from 'react';

import { getPreviewImages } from '@/src/utils/getPreviewImages';

import { FinalImages } from '@/src/components/pages/createPost/types';

export const useFinalImages = () => {
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const { previewImages } = getPreviewImages(finalImages);

  const onRemove = (id: string) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  return { finalImages, setFinalImages, previewImages, onRemove };
};
