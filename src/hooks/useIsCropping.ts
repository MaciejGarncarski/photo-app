import { atom, useAtom } from 'jotai';

export const isCroppingAtom = atom(false);

export const useIsCropping = () => {
  const [isCropping, setIsCropping] = useAtom(isCroppingAtom);

  return { isCropping, setIsCropping };
};
