import { atom, useAtom } from 'jotai';

import { FinalImages } from '@/src/components/pages/createPost/types';

const finalImagesAtom = atom<FinalImages>([]);

export const useFinalImages = () => {
  const [finalImages, setFinalImages] = useAtom(finalImagesAtom);
  const resetFinalImages = () => setFinalImages([]);

  return { finalImages, setFinalImages, resetFinalImages };
};
