import Link from 'next/link';

import { Heading } from '@/components/atoms/heading/Heading';

import styles from './fourOFour.module.scss';

export const FourOFour = () => {
  return (
    <main className={styles.main}>
      <Heading tag="h2">404</Heading>
      <p>not found</p>
      <Link href="/" className={styles.error}>
        go back to homepage
      </Link>
    </main>
  );
};
