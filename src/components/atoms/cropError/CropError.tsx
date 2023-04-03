import { errorMessages } from '@/src/components/atoms/cropError/cropError.data';

import { ImageCropErrors } from '@/src/components/organisms/cropImage/useCropState';

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
