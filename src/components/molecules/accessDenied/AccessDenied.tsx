import Link from 'next/link';

import { Heading } from '@/src/components/atoms/heading/Heading';

import styles from './AccessDenied.module.scss';

export const AccessDenied = () => {
  return (
    <section className={styles.accessDenied}>
      <Heading tag="h2" size="big">
        Access denied.
      </Heading>

      <Link href="/" className={styles.link}>
        Go to homepage.
      </Link>
    </section>
  );
};
