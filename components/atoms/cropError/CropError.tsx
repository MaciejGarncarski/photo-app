import { ImageCropErrors } from '@/components/molecules/cropImage/CropImage';

import styles from './cropError.module.scss';

type CropErrorProps = {
  errorType: ImageCropErrors;
};

export const DimensionError = 'Image dimensions are too small 🥺';
export const FileSizeError = 'Image size is too big 😲';
export const InvalidTypeError = 'Invalid file type 🤔';
export const NoImageDetectedError = 'No image detected 😒';
export const TooManyImagesError = 'Too many images at once 🤦‍♂️';

const messagesData: Record<string, string> = {
  DIMENSIONS: DimensionError,
  FILE_SIZE: FileSizeError,
  INVALID_TYPE: InvalidTypeError,
  NO_IMAGE_DETECTED: NoImageDetectedError,
  TOO_MANY_IMAGES: TooManyImagesError,
};

export const CropError = ({ errorType }: CropErrorProps) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{messagesData[errorType]}</p>;
};
