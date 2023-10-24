import { useRef } from 'react';

type UseLongPressArguments = {
  onStart: () => void;
  onEnd: () => void;
};

export const useLongPress = ({ onEnd, onStart }: UseLongPressArguments) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef(false);

  const endTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    longPressRef.current = false;
    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      onEnd();
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const handleOnMouseDown = () => {
    startTimer();
    onStart();
  };

  const handleOnMouseUp = () => {
    endTimer();
  };

  const handleOnTouchStart = () => {
    startTimer();
    onStart();
  };

  const handleOnTouchEnd = () => {
    endTimer();
  };

  return {
    onMouseDown: handleOnMouseDown,
    onMouseUp: handleOnMouseUp,
    onTouchStart: handleOnTouchStart,
    onTouchEnd: handleOnTouchEnd,
  };
};
