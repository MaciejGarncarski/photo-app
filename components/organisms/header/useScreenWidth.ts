import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'throttle-debounce';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  const throttledHandleResize = useMemo(() => debounce(500, handleResize), []);
  useEffect(() => {
    throttledHandleResize();
    window.addEventListener('resize', throttledHandleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [screenWidth, throttledHandleResize]);

  const isMobile = screenWidth === 0 ? false : screenWidth < 768;
  return { screenWidth, isMobile };
};
