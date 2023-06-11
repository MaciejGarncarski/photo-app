import { Heading } from '@/src/components/atoms/heading/Heading';

import styles from './EditAccountHeading.module.scss';

export const EditAccountHeading = ({ text }: { text: string }) => {
  return (
    <div className={styles.heading}>
      <Heading tag="h2" size="big">
        {text}
      </Heading>
    </div>
  );
};
