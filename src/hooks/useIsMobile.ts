import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | 'loading'>('loading');

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 1279;
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
