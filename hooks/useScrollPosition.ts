import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';

export const useScrollPosition = () => {
  const [isGoingUp, setIsGoingUp] = useState<boolean>(true);
  const [scrollPos, setScrollPos] = useState<number>(0);

  const lastScroll = useRef<number>(0);

  const throttledScroll = useMemo(
    () =>
      throttle(200, () => {
        const isGoingUp = window.scrollY < lastScroll.current;
        setScrollPos(window.scrollY);
        setIsGoingUp(isGoingUp);
        lastScroll.current = scrollY > 0 ? scrollY : 0;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    lastScroll.current = window.scrollY;

    window.addEventListener('scroll', throttledScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [scrollPos, throttledScroll]);

  return { isGoingUp, scrollPos };
};
