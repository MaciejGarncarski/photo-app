import { IconHome, IconSquareRoundedPlus } from '@tabler/icons';
import { ReactNode } from 'react';

import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { NavAccountButton } from '@/components/atoms/navAccountButton/NavAccountButton';
import { NavListButton } from '@/components/atoms/navListButton/NavListButton';
import { SignInButton } from '@/components/atoms/signInButton/SignInButton';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useUser } from '@/components/pages/account/useUser';

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
  const { username } = useUser({ userId: session?.user?.id });

  if (status === 'loading' || !session?.user) {
    return null;
  }

  if (!isSignedIn) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, onClick, href, title }) => {
        return <NavListButton icon={icon} onClick={onClick} href={href} title={title} key={title} />;
      })}
      {username && <NavAccountButton userId={session.user.id ?? ''} />}
    </ul>
  );
};
