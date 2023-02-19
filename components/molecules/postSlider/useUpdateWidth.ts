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
    const handleWindowResize = () => {
      if (!imageRef.current) {
        return;
      }
      setWidth(imageRef.current.clientWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return { width, imageRef };
};
