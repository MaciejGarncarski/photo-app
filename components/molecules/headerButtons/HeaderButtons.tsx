import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { AiOutlineHome, AiOutlinePlusSquare, AiOutlineSave } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

import styles from './headerButtons.module.scss';

import { HeaderButton } from '@/components/atoms/headerButton/HeaderButton';
import { SignInButton } from '@/components/atoms/SignInButton/SignInButton';

export type ListData = {
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

export const HeaderButtons = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    return <SignInButton />;
  }

  return (
    <>
      <ul className={styles.list}>
        {listData.map(({ icon, alt, onClick, href, title }) => {
          return (
            <HeaderButton
              icon={icon}
              alt={alt}
              onClick={onClick}
              href={href}
              title={title}
              key={title}
            />
          );
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
      <ReactTooltip effect='solid' />
    </>
  );
};
