import { IMAGE_MAX_FILE_SIZE } from '@/utils/handleDropImage';

import { ImageCropErrors } from '@/components/molecules/cropImage/useCropImage';

import styles from './cropError.module.scss';

type PropsTypes = {
  errorType: ImageCropErrors;
};

export const DimensionError = 'Image dimensions are too small 🥺';
export const FileSizeError = `Maximum file size is ${IMAGE_MAX_FILE_SIZE / 1000000}MB 😲`;
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

export const CropError = ({ errorType }: PropsTypes) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{messagesData[errorType]}</p>;
};
