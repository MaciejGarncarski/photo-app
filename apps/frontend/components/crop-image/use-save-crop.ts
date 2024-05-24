import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import type { Area } from "react-easy-crop";

import { convertToBlob } from "@/utils/convert-to-blob";

import type { FinalImages } from "@/components/pages/create-post/create-post-schema";
type Arguments = {
  resetImgSrc: () => void;
  imgSrc: string | null;
  finalImages: FinalImages;
  setFinalImages: (final: FinalImages) => void;
  cropAreaPixels: Area;
};

export const useSaveCrop = ({
  setFinalImages,
  finalImages,
  imgSrc,
  cropAreaPixels,
  resetImgSrc,
}: Arguments) => {
  const [isCropping, setIsCropping] = useState(false);

  const saveCrop = useCallback(async () => {
    setIsCropping(true);
    if (cropAreaPixels && imgSrc) {
      const blob = await convertToBlob(imgSrc, cropAreaPixels);
      const imageId = nanoid();

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
