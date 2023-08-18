import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!imageRef.current) {
      return;
    }
    setWidth(imageRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!imageRef.current) {
        return;
      }
      setWidth(imageRef.current.clientWidth);
    };
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
