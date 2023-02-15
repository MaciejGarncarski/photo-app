import { useEffect } from 'react';

export const useCloseTooltip = (tooltip: HTMLElement | null, setIsOpen: (isOpen: boolean) => void) => {
  useEffect(() => {
    const handleTooltipClose = (mouseEv: MouseEvent) => {
      const target = mouseEv.target as HTMLElement;
      if (tooltip?.contains(target)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener('click', handleTooltipClose);

    return () => {
      document.removeEventListener('click', handleTooltipClose);
    };
  }, [setIsOpen, tooltip]);
};
