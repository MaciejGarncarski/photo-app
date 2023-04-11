import { Loader } from '@/src/components/molecules/loader/Loader';

import styles from './TextWithLoader.module.scss';

export const TextWithLoader = ({ text }: { text: string }) => {
  return (
    <section className={styles.container}>
      <Loader color="blue" size="normal" />
      <p className={styles.text}>{text}</p>
    </section>
  );
};
