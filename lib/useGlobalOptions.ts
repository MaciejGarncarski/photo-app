import create from 'zustand';

type GlobalOptions = {
  scrollPos: number;
  setScrollPos: (state: number) => void;
  isGoingUp: boolean;
  setIsGoingUp: (isUp: boolean) => void;
  screenWidth: number;
  setScreenWidth: (state: number) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

export const useGlobalOptions = create<GlobalOptions>((set) => ({
  scrollPos: 0,
  setScrollPos: (newScrollPos) => set(() => ({ scrollPos: newScrollPos })),
  isGoingUp: false,
  setIsGoingUp: (newIsUp) => set(() => ({ isGoingUp: newIsUp })),
  screenWidth: 0,
  setScreenWidth: (newScreenWidth) => set(() => ({ screenWidth: newScreenWidth })),
  isMobile: false,
  setIsMobile: (newMobile) => set(() => ({ isMobile: newMobile })),
}));
