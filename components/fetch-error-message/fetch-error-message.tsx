import { Heading } from "@/components/typography/heading/heading";

import styles from "./fetch-error-message.module.scss";

type Props = {
  message: string;
};

export const FetchErrorMessage = ({ message }: Props) => {
  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big">
        {message}
      </Heading>
      <span className={styles.tryAgain}>Try again later &#129396;</span>
    </section>
  );
};
