import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import { throttle } from 'throttle-debounce';

import { isGoingUpAtom, scrollPosAtom } from '@/lib/state/scrollPos';

export const useScrollPosition = () => {
  const [, setIsGoingUp] = useAtom(isGoingUpAtom);
  const [scrollPos, setScrollPos] = useAtom(scrollPosAtom);

  const lastScroll = useRef<number>(0);

  const throttledScroll = useMemo(
    () =>
      throttle(400, () => {
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
};
