import { useEffect, useState } from 'react';

export const MOBILE_DEVICE_MAX_WIDTH = 1279;

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
