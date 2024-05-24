import { useState } from "react";

import { getPreviewImages } from "@/utils/get-preview-images";

import type { FinalImages } from "@/components/pages/create-post/create-post-schema";

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
