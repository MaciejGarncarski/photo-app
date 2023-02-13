import { PixelCrop } from 'react-image-crop';

const IMG_QUALITY = 1;
const TO_RADIANS = Math.PI / 180;

export const convertToBlob = async (image: HTMLImageElement, crop: PixelCrop) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = 0 * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(1, 1);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      async (file) => {
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          const imgFile = await fetch(blobUrl).then((r) => r.blob());

          resolve(imgFile);
        }
      },
      'image/webp',
      IMG_QUALITY,
    );
  });

  return { blob };
};
