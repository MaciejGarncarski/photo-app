import Link from 'next/link';

import { Heading } from '@/components/atoms/heading/Heading';

import styles from './accessDenied.module.scss';

export const AccessDenied = () => {
  return (
    <section className={styles.accessDenied}>
      <Heading tag="h2">Access denied.</Heading>

      <Link href="/" className={styles.link}>
        Go to homepage.
      </Link>
    </section>
  );
};
