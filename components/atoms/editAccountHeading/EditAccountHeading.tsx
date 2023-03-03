import { Heading } from '@/components/atoms/heading/Heading';

import styles from './editAccountHeading.module.scss';

export const EditAccountHeading = ({ text }: { text: string }) => {
  return (
    <Heading tag="h2" className={styles.heading}>
      {text}
    </Heading>
  );
};
