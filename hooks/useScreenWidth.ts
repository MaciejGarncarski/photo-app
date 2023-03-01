import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(600);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      const isMobileDevice = window.innerWidth < 1279 || false;
      setIsMobile(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screenWidth, isMobile };
};
