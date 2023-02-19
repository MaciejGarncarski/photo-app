import { RefObject, useCallback, useEffect } from 'react';

export const useUpdateWidth = (imageRef: RefObject<HTMLDivElement>, setState: (newState: number) => void) => {
  const updateWidth = useCallback(() => {
    if (!imageRef.current?.offsetWidth) {
      return;
    }
    setState(imageRef.current.offsetWidth);
  }, [imageRef, setState]);

  useEffect(() => {
    updateWidth();

    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]);
};
