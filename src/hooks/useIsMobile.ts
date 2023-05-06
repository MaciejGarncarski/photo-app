import { useEffect, useState } from 'react';

import { MOBILE_DEVICE_MAX_WIDTH } from '@/src/utils/bodyLock';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | 'loading'>('loading');

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < MOBILE_DEVICE_MAX_WIDTH;
      setIsMobile(isMobileDevice);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};
