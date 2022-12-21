import { useEffect, useMemo } from 'react';
import { throttle } from 'throttle-debounce';

import { useGlobalOptions } from '@/lib/useGlobalOptions';

const THROTTLE_DELAY = 400;

export const useScreenWidth = () => {
  const screenWidth = useGlobalOptions((state) => state.screenWidth);
  const setScreenWidth = useGlobalOptions((state) => state.setScreenWidth);
  const setIsMobile = useGlobalOptions((state) => state.setIsMobile);

  const throttledHandleResize = useMemo(() => {
    return throttle(THROTTLE_DELAY, () => {
      const isMobile = screenWidth === 0 ? false : screenWidth < 768;
      setIsMobile(isMobile);
      setScreenWidth(window.innerWidth);
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
