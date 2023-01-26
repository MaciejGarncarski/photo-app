import { RefObject, useCallback, useEffect, useLayoutEffect } from 'react';

export const useUpdateWidth = (imageRef: RefObject<HTMLDivElement>, setState: (newState: number) => void) => {
  const updateWidth = useCallback(() => {
    if (!imageRef.current?.offsetWidth) {
      return;
    }
    setState(imageRef.current.offsetWidth);
  }, [imageRef, setState]);

  useLayoutEffect(() => {
    if (!imageRef.current) {
      return;
    }
    setState(imageRef.current.getBoundingClientRect().width);
  }, [imageRef, setState]);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [imageRef, updateWidth]);
};
