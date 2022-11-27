import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { AiOutlineHome, AiOutlinePlusSquare, AiOutlineSave } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

import styles from './header.module.scss';

import { SignInButton } from '@/components/atoms/SignInButton/SignInButton';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';

import { APP_NAME } from '@/pages';

type ListData = {
  icon: ReactNode;
  alt: string;
  title: string;
  href?: string;
  onClick?: () => void;
};

const listData: Array<ListData> = [
  {
    icon: <AiOutlineHome />,
    alt: 'Home',
    title: 'Home',
    href: '/',
  },
  {
    icon: <AiOutlinePlusSquare />,
    alt: 'Create post',
    title: 'Create',
    href: '/create-post',
  },
  {
    icon: <AiOutlineSave />,
    alt: 'Saved posts',
    title: 'Saved',
    href: '/posts/saved',
  },
];

export const Header = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>{APP_NAME}</h1>
      <LayoutSearch />
      <nav className={styles.nav}>
        {session ? (
          <ul className={styles.list}>
            {listData.map(({ icon, alt, onClick, href, title }) => {
              if (href) {
                return (
                  <li className={styles.listItem} key={alt} data-tip={alt}>
                    <Link href={href} className={clsx(styles.listItemChild)}>
                      {icon}
                    </Link>
                    <span className={styles.listItemTitle}>{title}</span>
                  </li>
                );
              }

              if (onClick) {
                return (
                  <li className={styles.listItem} key={alt} data-tip={alt}>
                    <button
                      className={clsx(styles.listItemChild, styles.listItemButton)}
                      type='button'
                      onClick={onClick}
                    >
                      {icon}
                      <span className='visually-hidden'>{alt}</span>
                      <span className={styles.listItemTitle}>{title}</span>
                    </button>
                  </li>
                );
              }
              return null;
            })}
            <li>
              <Link href='/user' className={clsx(styles.listItemChild)}>
                <span className='visually-hidden'>{session.user?.name}</span>
                <Image
                  className={styles.listItemImage}
                  src={session.user?.image ?? ''}
                  width={30}
                  height={30}
                  priority
                  alt={session.user?.name ?? 'User avatar'}
                />
                <span className={styles.listItemTitle}>Account</span>
              </Link>
            </li>
          </ul>
        ) : (
          <SignInButton />
        )}
        <ReactTooltip effect='solid' />
      </nav>
    </header>
  );
};
