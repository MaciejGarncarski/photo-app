import { useRef } from 'react';

type UseThrottle = {
  cb: () => void;
  limit: number;
};

export const useThrottle = ({ cb, limit }: UseThrottle) => {
  const lastRun = useRef(Date.now());

  return () => {
    if (Date.now() - lastRun.current >= limit) {
      cb();
      lastRun.current = Date.now();
    }
  };
};
