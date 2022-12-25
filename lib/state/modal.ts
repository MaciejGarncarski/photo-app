import { atom } from 'jotai';

export const postModalAtom = atom<boolean>(false);
export const postIdOfModalAtom = atom<number | null>(null);
