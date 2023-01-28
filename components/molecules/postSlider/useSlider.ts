import { PanInfo } from 'framer-motion';

import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';

type ArgsTypes = {
  currentIndex: number;
  postImages: Array<string>;
  setCurrentIndex: (newValue: (value: number) => number) => void;
};

export const useSlider = ({ currentIndex, postImages, setCurrentIndex }: ArgsTypes) => {
  const { isMobile } = useScreenWidth();
  const CHANGE_IMG_OFFSET = isMobile ? 50 : 150;

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
  return { prevImage, nextImage, handleDragEnd };
};
