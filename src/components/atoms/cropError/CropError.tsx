import { errorMessages } from '@/src/components/atoms/cropError/cropError.data';

import { DropZoneErrors } from '@/src/components/pages/createPost/types';

import styles from './cropError.module.scss';

type PropsTypes = {
  errorType: DropZoneErrors;
};

export const CropError = ({ errorType }: PropsTypes) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{errorMessages[errorType]}</p>;
};
