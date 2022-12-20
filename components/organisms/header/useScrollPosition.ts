import { useEffect, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import shallow from 'zustand/shallow';

import { useGlobalOptions } from '@/lib/useGlobalOptions';

export const useScrollPosition = () => {
  const scrollPos = useGlobalOptions((state) => state.scrollPos, shallow);
  const setIsGoingUp = useGlobalOptions((state) => state.setIsGoingUp, shallow);
  const setScrollPos = useGlobalOptions((state) => state.setScrollPos, shallow);

  const throttledScroll = useMemo(
    () =>
      throttle(400, (scrollEv: Event) => {
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
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [scrollPos, throttledScroll]);
};
