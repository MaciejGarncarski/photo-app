import { useCallback, useEffect, useRef, useState } from "react";

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResize = useCallback(() => {
    if (!imageRef.current) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setWidth(imageRef.current?.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return {
    width: width,
    imageRef,
  };
};
