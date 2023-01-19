import { IconHome, IconSquareRoundedPlus, IconStar } from '@tabler/icons';
import { ReactNode } from 'react';

import styles from './navButtons.module.scss';

import { NavAccountButton } from '@/components/atoms/navAccountButton/NavAccountButton';
import { NavListButton } from '@/components/atoms/navListButton/NavListButton';
import { SignInButton } from '@/components/atoms/signInButton/SignInButton';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

export type ListData = {
  icon: ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
};

const listData: Array<ListData> = [
  {
    icon: <IconHome size={32} />,
    title: 'Home',
    href: '/',
  },
  {
    icon: <IconSquareRoundedPlus size={32} />,
    title: 'Create post',
    href: '/create-post',
  },
  {
    icon: <IconStar size={32} />,
    title: 'Collection',
    href: '/collection',
  },
];

export const NavButtons = () => {
  const { session, status } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });

  if (status === 'loading') {
    return null;
  }

  if (!session?.user?.id) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, onClick, href, title }) => {
        return <NavListButton icon={icon} onClick={onClick} href={href} title={title} key={title} />;
      })}
      {data?.user?.username && <NavAccountButton userId={session.user.id ?? ''} />}
    </ul>
  );
};
