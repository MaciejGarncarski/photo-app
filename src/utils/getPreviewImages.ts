import { FinalImages } from '../components/pages/createPost/types';

export type PreviewImages = Array<
  | {
      id: number;
      src: string;
    }
  | undefined
>;

export const getPreviewImages = (images: FinalImages) => {
  const previewImages: PreviewImages = images.map((finalImg) => {
    if (finalImg?.file) {
      const img = URL.createObjectURL(finalImg?.file);
      return {
        id: finalImg?.id,
        src: img,
      };
    }
  });

  return { previewImages };
};
