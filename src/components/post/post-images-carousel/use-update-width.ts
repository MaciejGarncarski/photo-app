import { useEffect, useRef, useState } from 'react';

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }

    const handleResize = () => {
      if (!imageRef.current) {
        return;
      }
      setWidth(imageRef.current.clientWidth);
    };

    setWidth(imageRef.current.clientWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    imageRef,
  };
};
