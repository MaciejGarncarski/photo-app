import Link from 'next/link';

import styles from './header.module.scss';

import { HeaderButtons } from '@/components/molecules/headerButtons/HeaderButtons';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';

import { APP_NAME } from '@/pages';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={styles.heading}>{APP_NAME}</h1>
      </Link>
      <LayoutSearch />
      <nav className={styles.nav}>
        <HeaderButtons />
      </nav>
    </header>
  );
};
