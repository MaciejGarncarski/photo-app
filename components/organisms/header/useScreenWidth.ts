import { useEffect, useMemo } from 'react';
import { throttle } from 'throttle-debounce';

import { useStore } from '@/lib/useStore';

const THROTTLE_DELAY = 400;

export const useScreenWidth = () => {
  const setScreenWidth = useStore((state) => state.setScreenWidth);
  const setIsMobile = useStore((state) => state.setIsMobile);

  const throttledHandleResize = useMemo(() => {
    return throttle(THROTTLE_DELAY, () => {
      const isMobile = window.innerWidth < 800 || false;
      setScreenWidth(window.innerWidth);
      setIsMobile(isMobile);
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
};
