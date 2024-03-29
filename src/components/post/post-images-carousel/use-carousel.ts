import { PanInfo } from 'framer-motion';
import { useState } from 'react';

import { PostImage } from '@/src/schemas/post.schema';

type ArgsTypes = {
  postImages: Array<PostImage>;
};

const CHANGE_IMG_OFFSET = 50;

export const useCarousel = ({ postImages }: ArgsTypes) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevImage = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const handleNextImage = () => {
    if (currentIndex === postImages.length - 1) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    const { offset } = info;
    if (offset.x < CHANGE_IMG_OFFSET * -1) {
      handleNextImage();
      return;
    }

    if (offset.x > CHANGE_IMG_OFFSET) {
      handlePrevImage();
    }
  };
  return {
    handlePrevImage,
    handleNextImage,
    handleDragEnd,
    currentIndex,
  };
};
