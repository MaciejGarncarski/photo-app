import { atom } from 'jotai';

export const scrollPosAtom = atom<number>(0);
export const screenWidthAtom = atom<number>(0);
export const isMobileAtom = atom<boolean>(false);
export const isGoingUpAtom = atom<boolean>(true);
