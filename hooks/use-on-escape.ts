import { useEffect, useMemo } from "react";

type UseCloseOnEscapeArguments = {
  callback: () => void;
  disabled?: boolean;
};

export const useOnEscape = ({
  callback,
  disabled,
}: UseCloseOnEscapeArguments) => {
  const onKeyDown = useMemo(
    () => (keyboardEvent: KeyboardEvent) => {
      if (!disabled && keyboardEvent.code === "Escape") {
        callback();
      }
    },
    [callback, disabled],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });
};
