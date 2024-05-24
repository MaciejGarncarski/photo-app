import { useState } from "react";

const percentWidthToChangePhoto = 20;

export const useCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [side, setSide] = useState<"left" | "right">("right");

  const handlePrevImage = () => {
    setCurrentImage((prev) => {
      if (prev >= 0) {
        return prev - 1;
      }

      return prev;
    });
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => {
      if (prev <= 2) {
        return prev + 1;
      }

      return prev;
    });
  };

  return { currentImage, handlePrevImage, handleNextImage };
};
