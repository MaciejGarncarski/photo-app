import { Heading } from '@/components/atoms/heading/Heading';

import styles from './loadingHeading.module.scss';

export const LoadingHeading = ({ headingText }: { headingText: string }) => {
  return (
    <section className={styles.container}>
      <Heading tag="h2">{headingText}...</Heading>
    </section>
  );
};
