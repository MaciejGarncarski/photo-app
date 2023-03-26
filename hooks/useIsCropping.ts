import { atom, useAtom } from 'jotai';

export const isCroppingAtom = atom<boolean>(false);

export const useIsCropping = () => {
  const [isCropping, setIsCropping] = useAtom(isCroppingAtom);

  return { isCropping, setIsCropping };
};
