import { Heading } from '@/src/components/atoms/heading/Heading';

import styles from './FetchError.module.scss';

type PropsTypes = {
  message: string;
};

export const FetchError = ({ message }: PropsTypes) => {
  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big">
        {message}
      </Heading>
      <span className={styles.tryAgain}>Try again later &#129396;</span>
    </section>
  );
};
