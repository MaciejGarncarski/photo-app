import { IMAGE_MAX_FILE_SIZE } from '@/src/utils/handleDropImage';

import { ImageCropErrors } from '@/src/components/organisms/cropImage/useCropState';

export const DimensionError = 'Image dimensions are too small 🥺';
export const FileSizeError = `Maximum file size is ${IMAGE_MAX_FILE_SIZE / 1000000}MB 😲`;
export const InvalidTypeError = 'Invalid file type 🤔';
export const NoImageDetectedError = 'No image detected 😒';
export const TooManyImagesError = 'Too many images at once 🤦‍♂️';

type CropErrors = NonNullable<ImageCropErrors>;

export const errorMessages: Record<CropErrors, string> = {
  DIMENSIONS: DimensionError,
  FILE_SIZE: FileSizeError,
  INVALID_TYPE: InvalidTypeError,
  NO_IMAGE_DETECTED: NoImageDetectedError,
  TOO_MANY_IMAGES: TooManyImagesError,
};
