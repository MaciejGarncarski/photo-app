import { useCallback } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
  }, []);

  const unlockScroll = () => {
    document.body.style.overflow = 'unset';
  };

  return { lockScroll, unlockScroll };
};
