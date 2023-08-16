import { PanInfo } from 'framer-motion';
import { useState } from 'react';

import { PostImage } from '@/src/services/userPosts.service';

type ArgsTypes = {
  postImages: Array<PostImage>;
};

const CHANGE_IMG_OFFSET = 40;

export const useCarousel = ({ postImages }: ArgsTypes) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const prevImage = () => {
    if (currentIndex === 0) {
      return;
    }
    handlePrevImage();
  };

  const nextImage = () => {
    if (currentIndex === postImages.length - 1) {
      return;
    }
    handleNextImage();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    const { offset } = info;
    if (offset.x < CHANGE_IMG_OFFSET * -1) {
      nextImage();
    }
    if (offset.x > CHANGE_IMG_OFFSET) {
      prevImage();
    }
  };
  return { prevImage, nextImage, handleDragEnd, currentIndex };
};
