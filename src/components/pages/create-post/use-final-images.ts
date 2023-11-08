import { useMemo, useState } from 'react';

import { getPreviewImages } from '@/src/utils/get-preview-images';

import { FinalImages } from '@/src/components/pages/create-post/types';

export const useFinalImages = () => {
  const [finalImages, setFinalImages] = useState<FinalImages>([]);
  const { previewImages } = useMemo(
    () => getPreviewImages(finalImages),
    [finalImages],
  );

  const onRemove = (id: string) => {
    const filteredState = finalImages.filter((finalImg) => {
      return finalImg?.id !== id;
    });
    setFinalImages(filteredState);
  };

  return { finalImages, setFinalImages, previewImages, onRemove };
};
