import { useCallback, useEffect, useState } from 'react';

import { useThrottle } from '@/components/organisms/header/useThrottle';

export const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isGoingUp, setIsGoingUp] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.scrollY > scrollPos) {
      setIsGoingUp(false);
    }
    if (window.scrollY < scrollPos) {
      setIsGoingUp(true);
    }
    setScrollPos(window.scrollY);
  }, [scrollPos]);

  const throttledHandleScroll = useThrottle({ cb: handleScroll, limit: 250 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', throttledHandleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll, scrollPos, throttledHandleScroll]);

  return { isGoingUp, scrollPos };
};
