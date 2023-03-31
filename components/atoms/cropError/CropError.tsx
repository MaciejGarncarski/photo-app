import { errorMessages } from '@/components/atoms/cropError/cropError.data';
import { ImageCropErrors } from '@/components/molecules/cropImage/useCropImage';

import styles from './cropError.module.scss';

type PropsTypes = {
  errorType: ImageCropErrors;
};

export const CropError = ({ errorType }: PropsTypes) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{errorMessages[errorType]}</p>;
};
