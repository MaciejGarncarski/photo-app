import { Heading } from '@/src/components/typography/heading/heading';

import styles from './edit-account-heading.module.scss';

export const EditAccountHeading = ({ text }: { text: string }) => {
  return (
    <div className={styles.heading}>
      <Heading tag="h2" size="big">
        {text}
      </Heading>
    </div>
  );
};
