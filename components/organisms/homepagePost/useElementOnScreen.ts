import { useEffect, useMemo, useRef, useState } from 'react';

export const useElementOnScreen = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const memoOptions = useMemo(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    return options;
  }, []);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;

    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, memoOptions);

    const element = containerRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [memoOptions]);

  return { containerRef, isVisible };
};
