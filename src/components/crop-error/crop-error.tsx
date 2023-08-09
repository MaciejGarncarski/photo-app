import { errorMessages } from '@/src/components/crop-error/crop-error.data';
import { DropZoneErrors } from '@/src/components/pages/create-post/types';

import styles from './crop-error.module.scss';

type PropsTypes = {
  errorType: DropZoneErrors;
};

export const CropError = ({ errorType }: PropsTypes) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{errorMessages[errorType]}</p>;
};
