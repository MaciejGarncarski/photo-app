import { Loader } from '@/components/atoms/loader/Loader';

import styles from './textWithLoader.module.scss';

export const TextWithLoader = ({ text }: { text: string }) => {
  return (
    <section className={styles.container}>
      <Loader variant="margin-top" />
      <p className={styles.text}>{text}</p>
    </section>
  );
};
