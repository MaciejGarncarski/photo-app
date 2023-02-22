import { useEffect, useMemo, useState } from 'react';
import { throttle } from 'throttle-debounce';

const THROTTLE_DELAY = 400;

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(1000);

  const throttledHandleResize = useMemo(() => {
    return throttle(THROTTLE_DELAY, () => {
      const isMobileDevice = window.innerWidth < 1270 || false;
      setScreenWidth(window.innerWidth);
      setIsMobile(isMobileDevice);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    throttledHandleResize();
    window.addEventListener('resize', throttledHandleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [throttledHandleResize]);

  return { screenWidth, isMobile };
};
