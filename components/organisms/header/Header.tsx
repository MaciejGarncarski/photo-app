import Link from 'next/link';

import { APP_NAME } from '@/lib/next-seo.config';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';
import { Navbar } from '@/components/molecules/navbar/Navbar';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useScreenWidth();

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.anchor}>
          <h1 className={styles.heading}>{APP_NAME}</h1>
        </Link>
        <LayoutSearch />
        {!isMobile && <Navbar />}
      </header>
      {isMobile && <Navbar />}
    </>
  );
};
