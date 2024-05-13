import { errorMessages } from '@/components/crop-error/crop-error.data';
import { DropZoneErrors } from '@/components/pages/create-post/create-post-schema';

import styles from './crop-error.module.scss';

type Props = {
  errorType: DropZoneErrors;
};

export const CropError = ({ errorType }: Props) => {
  if (!errorType) {
    return null;
  }

  return <p className={styles.error}>{errorMessages[errorType]}</p>;
};
