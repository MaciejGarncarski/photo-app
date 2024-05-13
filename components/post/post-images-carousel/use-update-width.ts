import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const debouncedWidth = useDebounce(width, 350);

  const handleResize = useCallback(() => {
    if (!imageRef.current) {
      return;
    }
    setWidth(imageRef.current.clientWidth);
  }, []);

  useEffect(() => {
    setWidth(imageRef.current?.clientWidth || 0);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return useMemo(() => {
    return {
      width: debouncedWidth,
      imageRef,
    };
  }, [debouncedWidth]);
};
