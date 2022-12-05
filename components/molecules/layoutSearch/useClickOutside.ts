import { RefObject, useEffect } from 'react';

type UseClickOutside = {
  ref: RefObject<HTMLElement>;
  callback: () => void;
};

export const useClickOutside = ({ ref, callback }: UseClickOutside) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);
};
