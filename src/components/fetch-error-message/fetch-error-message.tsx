import { Heading } from '@/src/components/typography/heading/heading';

import styles from './fetch-error-message.module.scss';

type PropsTypes = {
  message: string;
};

export const FetchErrorMessage = ({ message }: PropsTypes) => {
  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big">
        {message}
      </Heading>
      <span className={styles.tryAgain}>Try again later &#129396;</span>
    </section>
  );
};
