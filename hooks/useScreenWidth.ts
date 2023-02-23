import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(600);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 1270 || false;
      setScreenWidth(window.innerWidth);
      setIsMobile(isMobileDevice);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screenWidth, isMobile };
};
