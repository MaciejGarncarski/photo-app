import styles from './cropError.module.scss';

import { ImageErrors } from '@/components/molecules/cropPostImage/CropPostImage';

type CropErrorProps = {
  errorType: ImageErrors;
};

export const CropError = ({ errorType }: CropErrorProps) => {
  if (!errorType) {
    return null;
  }

  return (
    <p className={styles.error}>
      {errorType === 'DIMENSIONS' && 'Image dimensions are too small 🥺'}
      {errorType === 'FILE_SIZE' && 'Image is too big 😲'}
      {errorType === 'INVALID_TYPE' && 'Invalid file type 🤔'}
    </p>
  );
};
