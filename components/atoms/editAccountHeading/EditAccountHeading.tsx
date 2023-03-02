import styles from './editAccountHeading.module.scss';

import { Heading } from '../heading/Heading';

export const EditAccountHeading = ({ text }: { text: string }) => {
  return (
    <Heading tag="h2" className={styles.heading}>
      {text}
    </Heading>
  );
};
