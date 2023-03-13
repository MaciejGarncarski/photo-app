import { Loader } from '@/components/atoms/loader/Loader';

import styles from './textWithLoader.module.scss';

export const TextWithLoader = ({ headingText }: { headingText: string }) => {
  return (
    <section className={styles.container}>
      <Loader variant="margin-top" />
      <p>{headingText}</p>
    </section>
  );
};
