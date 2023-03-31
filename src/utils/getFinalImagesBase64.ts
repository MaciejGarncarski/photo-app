import { FinalImages } from '../components/pages/createPost/types';

export type ImagesBase64 = Array<
  | {
      id: string;
      src: string;
    }
  | undefined
>;

export const getFinalImagesBase64 = (images: FinalImages) => {
  const imagesBase64: ImagesBase64 = images.map((finalImg) => {
    if (finalImg?.file) {
      const img = URL.createObjectURL(finalImg?.file);
      return {
        id: finalImg?.id,
        src: img,
      };
    }
  });

  return { imagesBase64 };
};
