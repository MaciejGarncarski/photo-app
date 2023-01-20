import { useCallback } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `17px`;
  }, []);

  const unlockScroll = () => {
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = `0`;
  };

  return { lockScroll, unlockScroll };
};
