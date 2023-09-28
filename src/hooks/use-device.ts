'use client';

import { useEffect, useState } from 'react';

export const DESKTOP_WIDTH = 1279;
export const TABLET_WIDTH = 768;

export const useIsMobile = () => {
  const [device, setDevice] = useState<
    'tablet' | 'desktop' | 'mobile' | 'loading'
  >('loading');

  useEffect(() => {
    const handleResize = () => {
      const isTablet =
        window.innerHeight >= TABLET_WIDTH && window.innerWidth < DESKTOP_WIDTH;

      if (isTablet) {
        setDevice('tablet');
        return;
      }

      if (window.innerWidth >= DESKTOP_WIDTH) {
        setDevice('desktop');
        return;
      }

      setDevice('mobile');
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDeviceLoading = device === 'loading';
  const isMobile = device === 'tablet' || device === 'mobile';
  return { isMobile, isDeviceLoading };
};
