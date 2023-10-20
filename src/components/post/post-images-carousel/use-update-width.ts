import { useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce } from '@/src/hooks/use-debounce';

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const debouncedWidth = useDebounce(width, 300);

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }

    const handleResize = () => {
      if (!imageRef.current) {
        return;
      }
      setWidth(imageRef.current.clientWidth);
    };

    setWidth(imageRef.current.clientWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return useMemo(() => {
    return {
      width: debouncedWidth,
      imageRef,
    };
  }, [debouncedWidth]);
};
