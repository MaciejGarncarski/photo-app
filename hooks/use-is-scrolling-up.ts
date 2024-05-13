import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

export const useIsScrollingUp = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const debouncedIsGoingUp = useDebounce(isScrollingUp);
  const lastScroll = useRef<number>(0);

  const handleScroll = () => {
    const isGoingUp = window.scrollY < lastScroll.current;
    setIsScrollingUp(isGoingUp);

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

  return { isScrollingUp: debouncedIsGoingUp };
};
