import { PanInfo } from 'framer-motion';

import { PostImage } from '@/src/components/atoms/accountPost/AccountPost';

type ArgsTypes = {
  currentIndex: number;
  postImages: Array<PostImage>;
  setCurrentIndex: (newValue: (value: number) => number) => void;
};

const CHANGE_IMG_OFFSET = 40;

export const useSlider = ({ currentIndex, postImages, setCurrentIndex }: ArgsTypes) => {
  const isSingleImage = postImages.length === 1;
  const isNotFirstIndex = currentIndex !== 0;
  const isNotLastIndex = currentIndex !== postImages.length - 1;

  const prevImage = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage - 1);
  };

  const nextImage = () => {
    if (currentIndex === postImages.length - 1) {
      return;
    }
    setCurrentIndex((prevImage) => prevImage + 1);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset } = info;
    if (offset.x < CHANGE_IMG_OFFSET * -1) {
      nextImage();
    }
    if (offset.x > CHANGE_IMG_OFFSET) {
      prevImage();
    }
  };
  return { prevImage, nextImage, handleDragEnd, isNotFirstIndex, isNotLastIndex, isSingleImage };
};
