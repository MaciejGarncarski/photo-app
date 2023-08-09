import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/src/hooks/use-debounce';

export const useIsGoingUp = () => {
  const [isGoingUp, setIsGoingUp] = useState(true);
  const debouncedIsGoingUp = useDebounce(isGoingUp);
  const lastScroll = useRef<number>(0);

  const handleScroll = () => {
    const isGoingUp = window.scrollY < lastScroll.current;
    setIsGoingUp(isGoingUp);

    lastScroll.current = scrollY > 0 ? scrollY : 0;
  };

  useEffect(() => {
    lastScroll.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isGoingUp: debouncedIsGoingUp };
};
