import { RefObject, useEffect } from 'react';
import { PixelCrop } from 'react-image-crop';

import { canvasPreview } from '@/utils/canvasPreview';

type UseCreateImg = {
  completedCrop?: PixelCrop;
  imgRef: RefObject<HTMLImageElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  setFinalImg: (image: Blob) => void;
};

export const useCreateImg = ({
  completedCrop,
  imgRef,
  previewCanvasRef,
  setFinalImg,
}: UseCreateImg) => {
  useEffect(() => {
    const createImg = async () => {
      if (
        !imgRef.current ||
        !previewCanvasRef.current ||
        !completedCrop?.height ||
        !completedCrop.width
      ) {
        return;
      }
      const { toBlob } = await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop
      );

      setFinalImg(await toBlob);
    };
    createImg();
  }, [completedCrop, imgRef, previewCanvasRef, setFinalImg]);
};
