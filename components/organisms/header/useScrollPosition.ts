import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'throttle-debounce';

export const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isGoingUp, setIsGoingUp] = useState<boolean>(false);

  const handleScroll = useCallback(
    (scrollEv: Event) => {
      const target = scrollEv.currentTarget as Window;
      if (target === null || typeof target === 'undefined') {
        return;
      }

      if (window.scrollY > scrollPos) {
        setIsGoingUp(false);
      }
      if (window.scrollY < scrollPos) {
        setIsGoingUp(true);
      }

      setScrollPos(target.scrollY);
    },
    [scrollPos]
  );

  const throttledScroll = useMemo(() => throttle(600, handleScroll), [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [scrollPos, throttledScroll]);

  return { isGoingUp };
};
