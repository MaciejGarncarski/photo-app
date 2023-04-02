import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';

export const useUpdateWidth = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!imageRef.current) {
      return;
    }
    setWidth(imageRef.current.clientWidth);
  }, []);

  const debouncedResize = useMemo(
    () =>
      debounce(500, () => {
        if (!imageRef.current) {
          return;
        }
        setWidth(imageRef.current.clientWidth);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [debouncedResize]);

  return useMemo(() => {
    return {
      width,
      imageRef,
    };
  }, [width]);
};
