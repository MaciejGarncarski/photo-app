import Link from 'next/link';

import { Heading } from '@/src/components/atoms/heading/Heading';

import styles from './notFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.main}>
      <Heading tag="h2" size="big">
        404
      </Heading>
      <p>not found</p>
      <Link href="/" className={styles.error}>
        go back to homepage
      </Link>
    </main>
  );
};
