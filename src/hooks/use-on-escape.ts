import { useEffect } from 'react';

type UseCloseOnEscapeArguments = {
  callback: () => void;
  disabled?: boolean;
};

export const useOnEscape = ({
  callback,
  disabled,
}: UseCloseOnEscapeArguments) => {
  const onKeyDown = (keyboardEvent: KeyboardEvent) => {
    keyboardEvent.stopPropagation();

    if (!disabled && keyboardEvent.code === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });
};
