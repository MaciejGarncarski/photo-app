import { PanInfo } from 'framer-motion';

import { PostImage } from '@/src/services/userPosts.service';

type ArgsTypes = {
  currentIndex: number;
  postImages: Array<PostImage>;
  handlePrevImage: () => void;
  handleNextImage: () => void;
};

const CHANGE_IMG_OFFSET = 40;

export const useSlider = ({
  currentIndex,
  postImages,
  handlePrevImage,
  handleNextImage,
}: ArgsTypes) => {
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
  return { prevImage, nextImage, handleDragEnd };
};
