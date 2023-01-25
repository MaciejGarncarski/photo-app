import { useEffect } from 'react';

import { FinalImages, ImagesBase64 } from '@/components/pages/createPost/CreatePost';

export const useConvertToBase64 = (images: FinalImages, setImagesBase64: (finalImg: ImagesBase64) => void) => {
  useEffect(() => {
    const convertedFiles = images.map((finalImg) => {
      if (finalImg?.file) {
        const img = URL.createObjectURL(finalImg?.file);
        return {
          id: finalImg?.id,
          src: img,
        };
      }
    });
    setImagesBase64(convertedFiles);
  }, [images, setImagesBase64]);
};
