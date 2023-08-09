import Link from 'next/link';

import { Heading } from '@/src/components/typography/heading/heading';

import styles from './not-found-page.module.scss';

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
