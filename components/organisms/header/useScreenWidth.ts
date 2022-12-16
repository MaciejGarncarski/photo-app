import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    const throttledHandleResize = throttle(500, handleResize);
    window.addEventListener('resize', throttledHandleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [screenWidth]);

  const isMobile = screenWidth === 0 ? false : screenWidth < 768;
  return { screenWidth, isMobile };
};
