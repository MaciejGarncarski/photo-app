import type { FinalImages } from '@/components/pages/create-post/create-post-schema';

export type PreviewImages = Array<
  | {
      id: string;
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
