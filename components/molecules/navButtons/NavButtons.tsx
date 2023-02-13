import { IconHome, IconSquareRoundedPlus } from '@tabler/icons';
import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { NavAccountButton } from '@/components/atoms/navAccountButton/NavAccountButton';
import { NavListButton } from '@/components/atoms/navListButton/NavListButton';
import { SignInButton } from '@/components/atoms/signInButton/SignInButton';

import styles from './navButtons.module.scss';

export type ListData = {
  icon: ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
};

const listData: Array<ListData> = [
  {
    icon: <IconHome />,
    title: 'Home',
    href: '/',
  },
  {
    icon: <IconSquareRoundedPlus />,
    title: 'Create post',
    href: '/create-post',
  },
  {
    icon: <IconStarWrapper />,
    title: 'Collection',
    href: '/collection',
  },
];

export const NavButtons = () => {
  const { session, status, isSignedIn } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (!isSignedIn || !session?.user?.id) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, onClick, href, title }) => {
        return <NavListButton icon={icon} onClick={onClick} href={href} title={title} key={title} />;
      })}
      <NavAccountButton userId={session.user.id ?? ''} />
    </ul>
  );
};
